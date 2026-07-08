import api from "@/lib/axios";
import { OrderCreationRequest, OrderResponse, PageOrderResponse, Pageable, UpdateOrderStatusRequest } from "@/types/order";
import { ApiResponse } from "@/types/api";

export const OrderService = {
    createOrder: async (data: OrderCreationRequest) => {
        const res = await api.post<ApiResponse<OrderResponse>>("/api/v1/orders", data);
        return res.data;
    },
    getMyOrder: async (pageable: Pageable) => {
        const res = await api.get<ApiResponse<PageOrderResponse>>("/api/v1/orders/my-order", { params: pageable });
        return res.data;
    },
    getStoreOrder: async (storeId: string, pageable: Pageable) => {
        const res = await api.get<ApiResponse<PageOrderResponse>>(`/api/v1/orders/store/${storeId}`, { params: pageable });
        return res.data;
    },
    updateOrderStatus: async (orderId: string, data: UpdateOrderStatusRequest) => {
        const res = await api.put<ApiResponse<OrderResponse>>(`/api/v1/orders/${orderId}/status`, data);
        return res.data;
    },
};
