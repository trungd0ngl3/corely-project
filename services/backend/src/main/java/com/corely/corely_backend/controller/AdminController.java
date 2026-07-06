package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.product.ProductResponse;
import com.corely.corely_backend.dto.response.auth.UserResponse;
import com.corely.corely_backend.service.ProductService;
import com.corely.corely_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class AdminController {

    UserService userService;
    ProductService productService;

    @GetMapping("/users")
    public ApiResponse<Page<UserResponse>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.<Page<UserResponse>>builder()
                .result(userService.getAllUsers(page, size))
                .build();
    }

    @GetMapping("/products")
    public ApiResponse<Page<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        // TODO: Implement findAll in ProductService to include inactive products
        return ApiResponse.<Page<ProductResponse>>builder()
                .result(productService.getActiveProducts(page, size, "createdAt", "DESC"))
                .build();
    }
}
