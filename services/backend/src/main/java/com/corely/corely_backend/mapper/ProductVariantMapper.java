package com.corely.corely_backend.mapper;

import com.corely.corely_backend.dto.request.product.ProductVariantRequest;
import com.corely.corely_backend.dto.response.product.ProductVariantResponse;
import com.corely.corely_backend.entity.ProductVariant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductVariantMapper {
    @Mapping(target = "product", ignore = true)
    ProductVariant toProductVariant(ProductVariantRequest request);

    ProductVariantResponse toProductVariantResponse(ProductVariant productVariant);
}