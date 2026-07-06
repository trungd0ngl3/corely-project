package com.corely.corely_backend.mapper;

import com.corely.corely_backend.dto.request.product.ProductCreationRequest;
import com.corely.corely_backend.dto.response.product.ProductResponse;
import com.corely.corely_backend.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = { ProductVariantMapper.class })
public interface ProductMapper {
    @Mapping(target = "store", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "brand", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "variants", ignore = true)
    Product toProduct(ProductCreationRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "store", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "brand", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "variants", ignore = true)
    @Mapping(target = "slug", ignore = true)
    void updateProduct(@MappingTarget Product product, ProductCreationRequest request);

    @Mapping(source = "store.id", target = "storeId")
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "brand.id", target = "brandId")
    @Mapping(target = "imageUrls", expression = "java(product.getImages() != null ? product.getImages().stream().map(img -> img.getImageUrl().startsWith(\"/images/\") ? img.getImageUrl() : \"/images/products/\" + img.getImageUrl()).collect(java.util.stream.Collectors.toList()) : null)")
    ProductResponse toProductResponse(Product product);
}