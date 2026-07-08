export interface CategoryRequest {
    name: string;
    description?: string;
}

export interface CategoryResponse {
    id: string;
    name: string;
    slug: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}