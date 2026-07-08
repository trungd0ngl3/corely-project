import api from "@/lib/axios";
import { CartResponse, CartItemRequest, ApplyVoucherRequest } from "@/types/cart";

export const CartService = {
    getCart: async () => {
        return await api.get<CartResponse>("/api/v1/cart");
    },
    addToCart: async (data: CartItemRequest) => {
        return await api.post("/api/v1/cart/items", data);
    },
    updateCartItem: async (data: CartItemRequest) => {
        return await api.put("/api/v1/cart/items", data);
    },
    removeFromCart: async (productId: string, variantId?: string) => {
        return await api.delete(`/api/v1/cart/items/${productId}`, { params: { variantId } });
    },
    clearCart: async () => {
        return await api.delete("/api/v1/cart");
    },
    checkStock: async () => {
        return await api.get("/api/v1/cart/stock-check");
    },
    applyVoucher: async (data: ApplyVoucherRequest) => {
        return await api.post<CartResponse>("/api/v1/cart/voucher", data);
    },
    removeVoucher: async () => {
        return await api.delete<CartResponse>("/api/v1/cart/voucher");
    }
};