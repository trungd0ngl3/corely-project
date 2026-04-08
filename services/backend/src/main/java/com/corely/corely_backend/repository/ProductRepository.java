package com.corely.corely_backend.repository;

import com.corely.corely_backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    // Lấy danh sách sản phẩm đang bán
    Page<Product> findByIsActiveTrue(Pageable pageable);

    // Tìm sản phẩm theo Category Slug (Ví dụ: /category/cpu-intel)
    Page<Product> findByCategorySlugAndIsActiveTrue(String slug, Pageable pageable);

    // Tìm chi tiết sản phẩm theo Slug
    Product findBySlugAndIsActiveTrue(String slug);
}
