package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.ReviewRequest;
import com.corely.corely_backend.dto.response.ReviewResponse;
import com.corely.corely_backend.entity.Review;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.mapper.ReviewMapper;
import com.corely.corely_backend.repository.ProductRepository;
import com.corely.corely_backend.repository.ReviewRepository;
import com.corely.corely_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ReviewService {
    ReviewRepository reviewRepository;
    ProductRepository productRepository;
    UserRepository userRepository;
    ReviewMapper reviewMapper;

    public List<ReviewResponse> getProductReviews(String productId) {
        return reviewRepository.findByProductId(productId).stream()
                .map(reviewMapper::toReviewResponse)
                .collect(Collectors.toList());
    }

    public ReviewResponse createReview(String productId, ReviewRequest request) {
        var product = productRepository.findById(UUID.fromString(productId))
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByEmail(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        Review review = reviewMapper.toReview(request);
        review.setProduct(product);
        review.setUser(user);
        
        return reviewMapper.toReviewResponse(reviewRepository.save(review));
    }

    public ReviewResponse updateReview(String id, ReviewRequest request) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND));
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        return reviewMapper.toReviewResponse(reviewRepository.save(review));
    }

    public void deleteReview(String id) {
        if (!reviewRepository.existsById(id))
            throw new AppException(ErrorCode.REVIEW_NOT_FOUND);
        reviewRepository.deleteById(id);
    }
}