export interface ProductVariantRequest {
    id?: string;
    name: string;
    sku: string;
    price: number;
    stockQuantity: number;
    imageUrl?: string;
}

export interface ProductCreationRequest {
    name: string;
    sku: string;
    price: number;
    discountPrice?: number;
    stockQuantity: number;
    description?: string;
    specs?: Record<string, unknown>;
    thumbnailUrl?: string;
    storeId: string;
    categoryId: string;
    brandId: string;
    imageUrls?: string[];
    variants?: ProductVariantRequest[];
}

export interface ProductVariantResponse {
    id: string;
    name: string;
    sku: string;
    price: number;
    stockQuantity: number;
    imageUrl?: string;
    isActive: boolean;
    createdAt: string;
}

export interface ProductResponse {
    id: string;
    name: string;
    slug: string;
    sku: string;
    price: number;
    discountPrice?: number;
    stockQuantity: number;
    description?: string;
    specs?: Record<string, unknown>;
    thumbnailUrl?: string;
    isActive: boolean;
    storeId: string;
    storeName: string;
    categoryId: string;
    categoryName: string;
    brandId: string;
    brandName: string;
    imageUrls: string[];
    variants: ProductVariantResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface PageProductResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    content: ProductResponse[];
    number: number;
    first: boolean;
    last: boolean;
}
