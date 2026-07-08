export interface BrandRequest {
    name: string;
}

export interface BrandResponse {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}