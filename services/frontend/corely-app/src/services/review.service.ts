import api from "@/lib/axios";
import { ReviewResponse, CreateReviewRequest, UpdateReviewRequest } from "@/types/review";

export const ReviewService = {
    getReviews: async (productId: string) => {
        return await api.get<ReviewResponse[]>(`/api/v1/products/${productId}/reviews`);
    },
    createReview: async (productId: string, data: CreateReviewRequest) => {
        return await api.post<ReviewResponse>(`/api/v1/products/${productId}/reviews`, data);
    },
    updateReview: async (reviewId: string, data: UpdateReviewRequest) => {
        return await api.put<ReviewResponse>(`/api/v1/reviews/${reviewId}`, data);
    },
    deleteReview: async (reviewId: string) => {
        return await api.delete(`/api/v1/reviews/${reviewId}`);
    }
};