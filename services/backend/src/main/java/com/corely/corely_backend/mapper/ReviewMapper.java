package com.corely.corely_backend.mapper;

import com.corely.corely_backend.dto.request.ReviewRequest;
import com.corely.corely_backend.dto.response.ReviewResponse;
import com.corely.corely_backend.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review toReview(ReviewRequest request);

    @Mapping(target = "userName", source = "user.username")
    ReviewResponse toReviewResponse(Review review);
}