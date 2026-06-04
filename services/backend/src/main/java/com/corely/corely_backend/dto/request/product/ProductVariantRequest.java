package com.corely.corely_backend.dto.request.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductVariantRequest {
    @NotBlank(message = "VARIANT_NAME_REQUIRED")
    String name;

    String sku;

    @NotNull(message = "VARIANT_PRICE_REQUIRED")
    BigDecimal price;

    Integer stockQuantity;

    String imageUrl;
}