package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.cart.CartItemRequest;
import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.cart.CartResponse;
import com.corely.corely_backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CartController {

    CartService cartService;

    @PostMapping
    public ApiResponse<Void> addToCart(@RequestBody @Valid CartItemRequest request) {
        cartService.addToCart(request);
        return ApiResponse.<Void>builder().message("Item added to cart").build();
    }

    @PutMapping
    public ApiResponse<Void> updateCartItem(@RequestBody @Valid CartItemRequest request) {
        cartService.updateCartItem(request);
        return ApiResponse.<Void>builder().message("Cart item updated").build();
    }

    @DeleteMapping("/{productId}")
    public ApiResponse<Void> removeFromCart(
            @PathVariable UUID productId,
            @RequestParam(required = false) UUID variantId) {
        cartService.removeFromCart(productId, variantId);
        return ApiResponse.<Void>builder().message("Item removed from cart").build();
    }

    @DeleteMapping
    public ApiResponse<Void> clearCart() {
        cartService.clearCart();
        return ApiResponse.<Void>builder().message("Cart cleared").build();
    }

    @GetMapping
    public ApiResponse<CartResponse> getCart() {
        return ApiResponse.<CartResponse>builder()
                .result(cartService.getCart())
                .build();
    }
}