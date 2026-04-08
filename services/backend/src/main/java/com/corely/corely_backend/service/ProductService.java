package com.corely.corely_backend.service;


import com.corely.corely_backend.entity.Product;
import com.corely.corely_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public Page<Product> getAllActiveProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return productRepository.findByIsActiveTrue(pageable);
    }

    @Transactional(readOnly = true)
    public Product getProductBySlug(String slug) {
        Product product = productRepository.findBySlugAndIsActiveTrue(slug);
        if (product == null) {
            throw new RuntimeException("Sản phẩm không tồn tại!");
        }
        return product;
    }
}
