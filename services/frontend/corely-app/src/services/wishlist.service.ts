import api from "@/lib/axios";
import { WishlistResponse } from "@/types/wishlist";

export const WishlistService = {
    getMyWishlist: async () => {
        return await api.get<WishlistResponse>("/api/v1/wishlist");
    },
    addToWishlist: async (productId: string) => {
        return await api.post(`/api/v1/wishlist/${productId}`);
    },
    removeFromWishlist: async (productId: string) => {
        return await api.delete(`/api/v1/wishlist/${productId}`);
    }
};