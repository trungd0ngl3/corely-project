export interface CartItemRequest {
    productId: string;
    variantId?: string;
    quantity: number;
}

export interface ApplyVoucherRequest {
    voucherCode: string;
}

export interface CartItemResponse {
    productId: string;
    variantId?: string;
    productName: string;
    variantName?: string;
    imageUrl: string;
    price: number;
    quantity: number;
    subtotal: number;
    inStock: boolean;
    availableStock: number;
    storeId: string;
    storeName: string;
}

export interface CartResponse {
    userId: string;
    items: CartItemResponse[];
    itemsByStore: Record<string, CartItemResponse[]>;
    totalAmount: number;
    totalItems: number;
    voucherCode?: string;
    discountAmount: number;
    finalAmount: number;
}