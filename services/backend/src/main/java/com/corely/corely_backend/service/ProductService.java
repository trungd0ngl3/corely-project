package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.product.ProductCreationRequest;
import com.corely.corely_backend.dto.response.product.ProductResponse;
import com.corely.corely_backend.entity.Product;
import com.corely.corely_backend.entity.ProductImage;
import com.corely.corely_backend.entity.ProductVariant;
import com.corely.corely_backend.entity.Store;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.mapper.ProductMapper;
import com.corely.corely_backend.mapper.ProductVariantMapper;
import com.corely.corely_backend.repository.ProductRepository;
import com.corely.corely_backend.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {

    ProductRepository productRepository;
    StoreRepository storeRepository;
    ProductMapper productMapper;
    ProductVariantMapper productVariantMapper;

    @Transactional
    public ProductResponse createProduct(ProductCreationRequest request) {
        Store store = storeRepository.findById(request.getStoreId())
                .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_FOUND));

        Product product = productMapper.toProduct(request);
        product.setStore(store);
        product.setSlug(generateSlug(request.getName()));

        // Create final product reference for lambda expressions
        final Product finalProduct = product;

        // Handle images
        if (request.getImageUrls() != null && !request.getImageUrls().isEmpty()) {
            List<ProductImage> images = request.getImageUrls().stream()
                    .map(url -> {
                        ProductImage img = new ProductImage();
                        img.setImageUrl(url);
                        img.setProduct(finalProduct);
                        return img;
                    })
                    .collect(Collectors.toList());
            finalProduct.setImages(images);
        }

        // Handle variants
        if (request.getVariants() != null && !request.getVariants().isEmpty()) {
            List<ProductVariant> variants = request.getVariants().stream()
                    .map(variantRequest -> {
                        ProductVariant variant = productVariantMapper.toProductVariant(variantRequest);
                        variant.setProduct(finalProduct);
                        return variant;
                    })
                    .collect(Collectors.toList());
            finalProduct.setVariants(variants);
        }

        Product savedProduct = productRepository.save(finalProduct);
        return productMapper.toProductResponse(savedProduct);
    }

    public ProductResponse getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return productMapper.toProductResponse(product);
    }

    public Page<ProductResponse> getActiveProducts(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return productRepository.findByIsActiveTrue(pageable).map(productMapper::toProductResponse);
    }

    public Page<ProductResponse> getProductsByStore(UUID storeId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return productRepository.findByStoreIdAndIsActiveTrue(storeId, pageable)
                .map(productMapper::toProductResponse);
    }

    private String generateSlug(String name) {
        String slug = name.toLowerCase().replaceAll("[^a-z0-9]+", "-");
        int count = 1;
        String originalSlug = slug;
        while (productRepository.existsBySlug(slug)) {
            slug = originalSlug + "-" + count++;
        }
        return slug;
    }
}