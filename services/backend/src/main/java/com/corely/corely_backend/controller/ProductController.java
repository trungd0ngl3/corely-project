package com.corely.corely_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corely.corely_backend.entity.Product;
import com.corely.corely_backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Tạm thời cho phép Frontend gọi chéo domain
public class ProductController {

    private final ProductService productService;

    // Lấy danh sách sản phẩm (có phân trang)
    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy
    ) {
        return ResponseEntity.ok(productService.getAllActiveProducts(page, size, sortBy));
    }

    // Lấy chi tiết sản phẩm
    @GetMapping("/{slug}")
    public ResponseEntity<Product> getProductDetail(@PathVariable String slug) {
        return ResponseEntity.ok(productService.getProductBySlug(slug));
    }
}