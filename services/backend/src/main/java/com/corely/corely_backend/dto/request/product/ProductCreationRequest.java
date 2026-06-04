package com.corely.corely_backend.dto.request.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductCreationRequest {
    @NotBlank(message = "PRODUCT_NAME_REQUIRED")
    String name;

    String sku;

    @NotNull(message = "PRODUCT_PRICE_REQUIRED")
    BigDecimal price;

    BigDecimal discountPrice;

    Integer stockQuantity;

    String description;

    Map<String, Object> specs; // dynamic specs

    String thumbnailUrl;

    @NotNull(message = "STORE_ID_REQUIRED")
    UUID storeId;

    UUID categoryId;

    UUID brandId;

    List<String> imageUrls;

    List<ProductVariantRequest> variants;
}