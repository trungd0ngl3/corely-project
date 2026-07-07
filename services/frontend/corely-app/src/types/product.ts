export interface Product {
    id: string;
    name: string;
    slug: string;
    sku: string;
    price: number;
    discountPrice?: number;
    description: string;
    stock: number;
    images: string[];
    brand: string;
    category: string;
    rating: number;
}

export interface PageProductResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    content: Product[];
    number: number;
    first: boolean;
    last: boolean;
}