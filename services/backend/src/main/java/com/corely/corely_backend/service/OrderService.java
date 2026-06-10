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
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @Transactional
    public OrderResponse createOrder(OrderCreationRequest request) {
        String userIdStr = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findById(UUID.fromString(userIdStr))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Store store = storeRepository.findById(request.getStoreId())
                .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_FOUND));

        CartResponse cart = cartService.getCart();
        List<CartItemResponse> storeItems = cart.getItemsByStore().get(request.getStoreId());

        if (storeItems == null || storeItems.isEmpty()) {
            throw new AppException(ErrorCode.CART_EMPTY); // Need to define this error code
        }

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        Order order = new Order();
        order.setUser(user);
        order.setStore(store);
        order.setShippingAddress(request.getShippingAddress());
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

            // Check stock and reduce
            if (variant != null) {
                if (variant.getStockQuantity() < itemResponse.getQuantity()) {
                    throw new AppException(ErrorCode.OUT_OF_STOCK); // Need to define
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
            orderItem.setPrice(itemResponse.getPrice());

            BigDecimal subTotal = itemResponse.getPrice().multiply(BigDecimal.valueOf(itemResponse.getQuantity()));
            totalAmount = totalAmount.add(subTotal);

            orderItems.add(orderItem);

            // Remove from cart
            cartService.removeFromCart(product.getId(), variant != null ? variant.getId() : null);
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);

        order = orderRepository.save(order);

        return orderMapper.toOrderResponse(order);
    }

    public List<OrderResponse> getMyOrders() {
        String userIdStr = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Order> orders = orderRepository.findByUserId(UUID.fromString(userIdStr));
        return orders.stream().map(orderMapper::toOrderResponse).collect(Collectors.toList());
    }

    public List<OrderResponse> getStoreOrders(UUID storeId) {
        String userIdStr = SecurityContextHolder.getContext().getAuthentication().getName();
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_FOUND));

        if (!store.getOwner().getId().toString().equals(userIdStr)) {
            throw new AppException(ErrorCode.UNAUTHORIZED); // Only owner can view
        }

        List<Order> orders = orderRepository.findByStoreId(storeId);
        return orders.stream().map(orderMapper::toOrderResponse).collect(Collectors.toList());
    }

    public OrderResponse updateOrderStatus(UUID orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND)); // Need to define

        // Add authorization check here if needed (e.g. only store owner can update)

        order.setStatus(status);
        order = orderRepository.save(order);
        return orderMapper.toOrderResponse(order);
    }

    private String generateOrderCode() {
        // Simple implementation, could be more robust
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}