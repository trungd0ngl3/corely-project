package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.cart.CartItemRequest;
import com.corely.corely_backend.dto.response.cart.CartItemResponse;
import com.corely.corely_backend.dto.response.cart.CartResponse;
import com.corely.corely_backend.entity.Product;
import com.corely.corely_backend.entity.ProductVariant;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.repository.ProductRepository;
import com.corely.corely_backend.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CartService {

    RedisTemplate<String, Object> redisTemplate;
    ProductRepository productRepository;
    ProductVariantRepository productVariantRepository;

    private static final String CART_PREFIX = "cart:";

    public void addToCart(CartItemRequest request) {
        String userId = getCurrentUserId();
        String cartKey = CART_PREFIX + userId;
        String itemKey = generateItemKey(request.getProductId(), request.getVariantId());

        // Validate product exists
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if (request.getVariantId() != null) {
            ProductVariant variant = productVariantRepository.findById(request.getVariantId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND)); // Or VARIANT_NOT_FOUND
            if (!variant.getProduct().getId().equals(product.getId())) {
                throw new AppException(ErrorCode.PRODUCT_NOT_FOUND); // Invalid variant for product
            }
        }

        HashOperations<String, String, Integer> hashOps = redisTemplate.opsForHash();

        Integer currentQuantity = hashOps.get(cartKey, itemKey);
        int newQuantity = (currentQuantity != null ? currentQuantity : 0) + request.getQuantity();

        hashOps.put(cartKey, itemKey, newQuantity);
    }

    public void updateCartItem(CartItemRequest request) {
        String userId = getCurrentUserId();
        String cartKey = CART_PREFIX + userId;
        String itemKey = generateItemKey(request.getProductId(), request.getVariantId());

        HashOperations<String, String, Integer> hashOps = redisTemplate.opsForHash();

        if (request.getQuantity() <= 0) {
            hashOps.delete(cartKey, itemKey);
        } else {
            hashOps.put(cartKey, itemKey, request.getQuantity());
        }
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
            if (product == null || !product.getIsActive())
                continue;

            ProductVariant variant = null;
            if (variantId != null) {
                variant = productVariantRepository.findById(variantId).orElse(null);
                if (variant == null)
                    continue;
            }

            BigDecimal price = variant != null ? variant.getPrice() : product.getPrice();
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
                    .storeId(product.getStore().getId())
                    .storeName(product.getStore().getName())
                    .build();

            itemResponses.add(itemResponse);
            totalAmount = totalAmount.add(price.multiply(BigDecimal.valueOf(quantity)));
            totalItems += quantity;
        }

        Map<UUID, List<CartItemResponse>> itemsByStore = itemResponses.stream()
                .collect(Collectors.groupingBy(CartItemResponse::getStoreId));

        return CartResponse.builder()
                .userId(UUID.fromString(userId))
                .items(itemResponses)
                .itemsByStore(itemsByStore)
                .totalAmount(totalAmount)
                .totalItems(totalItems)
                .build();
    }

    private String generateItemKey(UUID productId, UUID variantId) {
        return productId.toString() + "_" + (variantId != null ? variantId.toString() : "null");
    }

    private String getCurrentUserId() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}