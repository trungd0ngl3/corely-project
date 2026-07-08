export interface ReviewRequest {
    rating: number;
    comment?: string;
}

export interface ReviewResponse {
    id: string;
    rating: number;
    comment: string;
    userName: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateReviewRequest = ReviewRequest;
export type UpdateReviewRequest = ReviewRequest;