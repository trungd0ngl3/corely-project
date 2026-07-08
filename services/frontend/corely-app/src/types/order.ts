export interface OrderCreationRequest {
    storeId: string;
    shippingAddress: string;
    shippingMethod: string;
    paymentMethod: string;
}

export interface UpdateOrderStatusRequest {
    status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";
}

export interface OrderItemResponse {
    id: string;
    productId: string;
    variantId?: string;
    productName: string;
    variantName?: string;
    imageUrl: string;
    price: number;
    quantity: number;
    subTotal: number;
}

export interface OrderResponse {
    id: string;
    orderCode: string;
    userId: string;
    storeId: string;
    storeName: string;
    totalAmount: number;
    shippingAddress: string;
    shippingMethod: string;
    status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";
    paymentMethod: string;
    paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
    createdAt: string;
    items: OrderItemResponse[];
}

export interface Pageable {
    page: number;
    size: number;
    sort?: string;
}

export interface PageOrderResponse {
    content: OrderResponse[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}