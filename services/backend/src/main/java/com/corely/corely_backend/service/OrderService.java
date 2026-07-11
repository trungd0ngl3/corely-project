package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.order.OrderCreationRequest;
import com.corely.corely_backend.dto.response.cart.CartItemResponse;
import com.corely.corely_backend.dto.response.cart.CartResponse;
import com.corely.corely_backend.dto.response.order.OrderResponse;
import com.corely.corely_backend.entity.*;
import com.corely.corely_backend.enums.OrderStatus;
import com.corely.corely_backend.enums.PaymentStatus;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.mapper.OrderMapper;
import com.corely.corely_backend.repository.OrderRepository;
import com.corely.corely_backend.repository.ProductRepository;
import com.corely.corely_backend.repository.ProductVariantRepository;
import com.corely.corely_backend.repository.StoreRepository;
import com.corely.corely_backend.repository.UserRepository;
import com.corely.corely_backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {

    OrderRepository orderRepository;
    UserRepository userRepository;
    StoreRepository storeRepository;
    ProductRepository productRepository;
    ProductVariantRepository productVariantRepository;
    CartService cartService;
    OrderMapper orderMapper;
    SecurityUtils securityUtils;

    @Transactional
    public OrderResponse createOrder(OrderCreationRequest request) {
        User user = securityUtils.getCurrentUser();

        Store store = storeRepository.findTopBy()
                .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_FOUND));

        CartResponse cart = cartService.getCart();
        List<CartItemResponse> storeItems = cart.getItems();

        if (storeItems == null || storeItems.isEmpty()) {
            throw new AppException(ErrorCode.CART_EMPTY); // Need to define this error code
        }

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        Order order = new Order();
        order.setUser(user);
        order.setStore(store);
        order.setShippingAddress(request.getShippingAddress());
        order.setShippingMethod(request.getShippingMethod());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setOrderCode(generateOrderCode());

        for (CartItemResponse itemResponse : storeItems) {
            Product product = productRepository.findById(itemResponse.getProductId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

            ProductVariant variant = null;
            if (itemResponse.getVariantId() != null) {
                variant = productVariantRepository.findById(itemResponse.getVariantId())
                        .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
            }

            if (!product.getIsActive() || (variant != null && !variant.getIsActive())) {
                throw new AppException(ErrorCode.PRODUCT_NOT_AVAILABLE);
            }

            BigDecimal currentPrice = (variant != null) ? variant.getPrice() : product.getPrice();

            if (variant != null) {
                // Use PESSIMISTIC_WRITE via repository if possible, or @Version on entity
                // For now, ensure we fetch fresh state
                if (variant.getStockQuantity() < itemResponse.getQuantity()) {
                    throw new AppException(ErrorCode.OUT_OF_STOCK);
                }
                variant.setStockQuantity(variant.getStockQuantity() - itemResponse.getQuantity());
                productVariantRepository.save(variant);
            } else {
                if (product.getStockQuantity() < itemResponse.getQuantity()) {
                    throw new AppException(ErrorCode.OUT_OF_STOCK);
                }
                product.setStockQuantity(product.getStockQuantity() - itemResponse.getQuantity());
                productRepository.save(product);
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setVariant(variant);
            orderItem.setQuantity(itemResponse.getQuantity());
            orderItem.setPrice(currentPrice);
            orderItem.setProductName(product.getName());
            orderItem.setVariantName(variant != null ? variant.getName() : null);
            orderItem.setImageUrl(product.getImages().isEmpty() ? null : String.valueOf(product.getImages().get(0)));
            orderItem.setSku(variant != null ? variant.getSku() : product.getSku());

            totalAmount = totalAmount.add(currentPrice.multiply(BigDecimal.valueOf(itemResponse.getQuantity())));
            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setSubtotal(totalAmount);
        order.setTotalAmount(totalAmount);

        // Clear cart after commit
        TransactionSynchronizationManager.registerSynchronization(
                new org.springframework.transaction.support.TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        for (CartItemResponse item : storeItems) {
                            cartService.removeFromCart(item.getProductId(), item.getVariantId());
                        }
                    }
                });

        order = orderRepository.save(order);

        return orderMapper.toOrderResponse(order);
    }

    public Page<OrderResponse> getMyOrder(Pageable pageable) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(securityUtils.getCurrentUserId(), pageable)
                .map(orderMapper::toOrderResponse);
    }

    public Page<OrderResponse> getStoreOrder(Pageable pageable) {
        Store store = storeRepository.findTopBy()
                .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_FOUND));

        return orderRepository.findByStoreIdOrderByCreatedAtDesc(store.getId(), pageable)
                .map(orderMapper::toOrderResponse);
    }

    public OrderResponse getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        User currentUser = securityUtils.getCurrentUser();

        boolean isOwner = order.getUser().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRoles()
                .stream()
                .anyMatch(r -> r.getName().equals("ADMIN"));

        if (!isOwner && !isAdmin) {
            throw new AppException(ErrorCode.FORBIDDEN);
        }

        return orderMapper.toOrderResponse(order);
    }

    public OrderResponse updateOrderStatus(UUID orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        User currentUser = securityUtils.getCurrentUser();

        boolean isAdmin = currentUser.getRoles()
                .stream()
                .anyMatch(r -> r.getName().equals("ADMIN"));

        if (!isAdmin) {
            throw new AppException(ErrorCode.FORBIDDEN);
        }

        if (!order.getStatus().canTransitionTo(status)) {
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS_TRANSITION);
        }

        order.setStatus(status);
        order = orderRepository.save(order);
        return orderMapper.toOrderResponse(order);
    }

    private String generateOrderCode() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
