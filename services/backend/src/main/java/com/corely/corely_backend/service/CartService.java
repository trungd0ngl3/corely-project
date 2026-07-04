package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.cart.CartItemRequest;
import com.corely.corely_backend.dto.response.cart.CartItemResponse;
import com.corely.corely_backend.dto.response.cart.CartResponse;
import com.corely.corely_backend.entity.Product;
import com.corely.corely_backend.entity.ProductVariant;
import com.corely.corely_backend.entity.Voucher;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.repository.ProductRepository;
import com.corely.corely_backend.repository.ProductVariantRepository;
import com.corely.corely_backend.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CartService {

    RedisTemplate<String, Object> redisTemplate;
    ProductRepository productRepository;
    ProductVariantRepository productVariantRepository;
    VoucherRepository voucherRepository;

    static final String CART_PREFIX = "cart:";
    static final String VOUCHER_PREFIX = "cart_voucher:";

    public void addToCart(CartItemRequest request) {
        String userId = getCurrentUserId();
        String cartKey = CART_PREFIX + userId;
        String itemKey = generateItemKey(request.getProductId(), request.getVariantId());

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        int stock = getStock(product, request.getVariantId());
        if (stock <= 0) throw new AppException(ErrorCode.OUT_OF_STOCK);

        if (request.getVariantId() != null) {
            ProductVariant variant = productVariantRepository.findById(request.getVariantId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
            if (!variant.getProduct().getId().equals(product.getId()))
                throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        HashOperations<String, String, Integer> hashOps = redisTemplate.opsForHash();
        Integer current = hashOps.get(cartKey, itemKey);
        int newQty = (current != null ? current : 0) + request.getQuantity();

        if (newQty > stock) throw new AppException(ErrorCode.OUT_OF_STOCK);

        hashOps.put(cartKey, itemKey, newQty);
    }

    public void updateCartItem(CartItemRequest request) {
        String userId = getCurrentUserId();
        String cartKey = CART_PREFIX + userId;
        String itemKey = generateItemKey(request.getProductId(), request.getVariantId());

        HashOperations<String, String, Integer> hashOps = redisTemplate.opsForHash();

        if (request.getQuantity() <= 0) {
            hashOps.delete(cartKey, itemKey);
            return;
        }

        // Stock check
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        int stock = getStock(product, request.getVariantId());
        if (request.getQuantity() > stock) throw new AppException(ErrorCode.OUT_OF_STOCK);

        hashOps.put(cartKey, itemKey, request.getQuantity());
    }

    public void removeFromCart(UUID productId, UUID variantId) {
        String userId = getCurrentUserId();
        String cartKey = CART_PREFIX + userId;
        String itemKey = generateItemKey(productId, variantId);
        redisTemplate.opsForHash().delete(cartKey, itemKey);
    }

    public void clearCart() {
        String userId = getCurrentUserId();
        redisTemplate.delete(CART_PREFIX + userId);
        redisTemplate.delete(VOUCHER_PREFIX + userId);
    }

    public CartResponse getCart() {
        String userId = getCurrentUserId();
        String cartKey = CART_PREFIX + userId;

        HashOperations<String, String, Integer> hashOps = redisTemplate.opsForHash();
        Map<String, Integer> cartItems = hashOps.entries(cartKey);

        List<CartItemResponse> itemResponses = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;
        int totalItems = 0;

        for (Map.Entry<String, Integer> entry : cartItems.entrySet()) {
            String[] ids = entry.getKey().split("_");
            UUID productId = UUID.fromString(ids[0]);
            UUID variantId = !ids[1].equals("null") ? UUID.fromString(ids[1]) : null;
            Integer quantity = entry.getValue();

            Product product = productRepository.findById(productId).orElse(null);
            if (product == null || !product.getIsActive()) continue;

            ProductVariant variant = null;
            if (variantId != null) {
                variant = productVariantRepository.findById(variantId).orElse(null);
                if (variant == null) continue;
            }

            BigDecimal price = variant != null ? variant.getPrice() : product.getPrice();
            BigDecimal subtotal = price.multiply(BigDecimal.valueOf(quantity));
            int stock = variant != null ? variant.getStockQuantity() : product.getStockQuantity();
            String imageUrl = product.getImages() != null && !product.getImages().isEmpty()
                    ? product.getImages().get(0).getImageUrl()
                    : null;

            CartItemResponse itemResponse = CartItemResponse.builder()
                    .productId(product.getId())
                    .variantId(variantId)
                    .productName(product.getName())
                    .variantName(variant != null ? variant.getName() : null)
                    .imageUrl(imageUrl)
                    .price(price)
                    .quantity(quantity)
                    .subtotal(subtotal)
                    .inStock(stock >= quantity)
                    .availableStock(stock)
                    .storeId(product.getStore().getId())
                    .storeName(product.getStore().getName())
                    .build();

            itemResponses.add(itemResponse);
            totalAmount = totalAmount.add(subtotal);
            totalItems += quantity;
        }

        Map<UUID, List<CartItemResponse>> itemsByStore = itemResponses.stream()
                .collect(Collectors.groupingBy(CartItemResponse::getStoreId));

        String voucherCode = (String) redisTemplate.opsForValue().get(VOUCHER_PREFIX + userId);
        BigDecimal discountAmount = BigDecimal.ZERO;
        if (voucherCode != null) {
            try {
                discountAmount = calculateDiscount(voucherCode, totalAmount);
            } catch (AppException e) {
                // Voucher no longer valid, remove it
                redisTemplate.delete(VOUCHER_PREFIX + userId);
                voucherCode = null;
            }
        }

        BigDecimal finalAmount = totalAmount.subtract(discountAmount).max(BigDecimal.ZERO);

        return CartResponse.builder()
                .userId(UUID.fromString(userId))
                .items(itemResponses)
                .itemsByStore(itemsByStore)
                .totalAmount(totalAmount)
                .totalItems(totalItems)
                .voucherCode(voucherCode)
                .discountAmount(discountAmount)
                .finalAmount(finalAmount)
                .build();
    }

    public CartResponse applyVoucher(String voucherCode) {
        // Validate voucher exists and is valid
        validateVoucher(voucherCode);

        String userId = getCurrentUserId();
        redisTemplate.opsForValue().set(VOUCHER_PREFIX + userId, voucherCode);

        return getCart();
    }

    public CartResponse removeVoucher() {
        String userId = getCurrentUserId();
        redisTemplate.delete(VOUCHER_PREFIX + userId);
        return getCart();
    }

    public List<CartItemResponse> checkStock() {
        CartResponse cart = getCart();
        return cart.getItems().stream()
                .filter(item -> !item.getInStock())
                .collect(Collectors.toList());
    }

    private void validateVoucher(String code) {
        Voucher voucher = voucherRepository.findByCode(code)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_VOUCHER));

        LocalDateTime now = LocalDateTime.now();
        if (!voucher.getIsActive()
                || (voucher.getStartDate() != null && now.isBefore(voucher.getStartDate()))
                || (voucher.getEndDate() != null && now.isAfter(voucher.getEndDate()))
                || (voucher.getUsageLimit() != null && voucher.getUsedCount() >= voucher.getUsageLimit())) {
            throw new AppException(ErrorCode.INVALID_VOUCHER);
        }
    }

    private BigDecimal calculateDiscount(String code, BigDecimal totalAmount) {
        Voucher voucher = voucherRepository.findByCode(code)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_VOUCHER));

        validateVoucher(code);

        if (voucher.getMinOrderValue() != null && totalAmount.compareTo(voucher.getMinOrderValue()) < 0) {
            return BigDecimal.ZERO;
        }

        BigDecimal discount;
        switch (voucher.getDiscountType().toUpperCase()) {
            case "PERCENTAGE":
                discount = totalAmount.multiply(voucher.getDiscountValue())
                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                if (voucher.getMaxDiscountAmount() != null) {
                    discount = discount.min(voucher.getMaxDiscountAmount());
                }
                break;
            case "FIXED":
                discount = voucher.getDiscountValue();
                break;
            case "FREE_SHIP":
                discount = BigDecimal.ZERO; // ponytail: handled at checkout/shipping layer
                break;
            default:
                discount = BigDecimal.ZERO;
        }

        return discount;
    }

    private int getStock(Product product, UUID variantId) {
        if (variantId != null) {
            ProductVariant variant = productVariantRepository.findById(variantId).orElse(null);
            return variant != null ? variant.getStockQuantity() : 0;
        }
        return product.getStockQuantity() != null ? product.getStockQuantity() : 0;
    }

    private String generateItemKey(UUID productId, UUID variantId) {
        return productId.toString() + "_" + (variantId != null ? variantId.toString() : "null");
    }

    private String getCurrentUserId() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}