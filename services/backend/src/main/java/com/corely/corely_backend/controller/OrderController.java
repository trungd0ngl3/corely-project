package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.order.OrderCreationRequest;
import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.order.OrderResponse;
import com.corely.corely_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/Order")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {

    OrderService orderService;

    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@RequestBody @Valid OrderCreationRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.createOrder(request))
                .build();
    }

    @GetMapping("/my-Order")
    public ApiResponse<org.springframework.data.domain.Page<OrderResponse>> getMyOrder(Pageable pageable) {
        return ApiResponse.<org.springframework.data.domain.Page<OrderResponse>>builder()
                .result(orderService.getMyOrder(pageable))
                .build();
    }

    @GetMapping("/store/{storeId}")
    public ApiResponse<org.springframework.data.domain.Page<OrderResponse>> getStoreOrder(
            @PathVariable UUID storeId,
            org.springframework.data.domain.Pageable pageable
    ) {
        return ApiResponse.<org.springframework.data.domain.Page<OrderResponse>>builder()
                .result(orderService.getStoreOrder(pageable))
                .build();
    }

    @PutMapping("/{orderId}/status")
    public ApiResponse<OrderResponse> updateOrdertatus(@PathVariable UUID orderId, @RequestBody com.corely.corely_backend.dto.request.order.UpdateOrderStatusRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.updateOrderStatus(orderId, request.getStatus()))
                .build();
    }
}
