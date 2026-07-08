export interface StoreResponse {
    id: string;
    name: string;
    slug: string;
    description?: string;
    logoUrl?: string;
    bannerUrl?: string;
    contactPhone?: string;
    contactEmail?: string;
    address?: string;
    isVerified: boolean;
    isActive: boolean;
    rating: number;
    createdAt: string;
}

export interface StoreUpdateRequest {
    name: string;
    description?: string;
    logoUrl?: string;
    bannerUrl?: string;
    contactPhone?: string;
    contactEmail?: string;
    address?: string;
}