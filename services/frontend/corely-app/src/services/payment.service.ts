import api from "@/lib/axios";
import { OrderResponse } from "@/types/order";

export interface PaymentResponse {
    id: string;
    orderId: string;
    amount: number;
    paymentMethod: string;
    status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
    transactionId?: string;
    createdAt: string;
}

export const PaymentService = {
    createVNPayUrl: async (orderId: string) => {
        return await api.post<string>(`/api/v1/payments/${orderId}/vnpay-url`);
    },
    getPaymentByOrderId: async (orderId: string) => {
        return await api.get<PaymentResponse>(`/api/v1/payments/order/${orderId}`);
    },
    handleVNPayCallback: async (params: Record<string, string>) => {
        return await api.get<PaymentResponse>("/api/v1/payments/vnpay/callback", { params });
    }
};