import { WishlistItem } from "@/types/wishlist";

export const wishlistService = {
    getAll: async (): Promise<WishlistItem[]> => {
        // Mock data.
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([]);
            }, 500);
        });
    },
    getCount: async (): Promise<number> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(0);
            }, 500);
        });
    }
};