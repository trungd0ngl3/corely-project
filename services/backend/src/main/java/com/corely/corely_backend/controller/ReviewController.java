package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.ReviewRequest;
import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.ReviewResponse;
import com.corely.corely_backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ReviewController {
    ReviewService reviewService;

    @GetMapping("/products/{productId}")
    public ApiResponse<List<ReviewResponse>> getProductReviews(@PathVariable String productId) {
        return ApiResponse.<List<ReviewResponse>>builder()
                .result(reviewService.getProductReviews(productId))
                .build();
    }

    @PostMapping("/products/{productId}")
    public ApiResponse<ReviewResponse> createReview(@PathVariable String productId, @RequestBody @Valid ReviewRequest request) {
        return ApiResponse.<ReviewResponse>builder()
                .result(reviewService.createReview(productId, request))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<ReviewResponse> updateReview(@PathVariable String id, @RequestBody @Valid ReviewRequest request) {
        return ApiResponse.<ReviewResponse>builder()
                .result(reviewService.updateReview(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteReview(@PathVariable String id) {
        reviewService.deleteReview(id);
        return ApiResponse.<Void>builder().build();
    }
}