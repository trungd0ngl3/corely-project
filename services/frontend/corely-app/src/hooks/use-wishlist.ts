import { create } from "zustand";
import { WishlistItem } from "@/types/wishlist";

interface WishlistState {
    items: WishlistItem[];
    count: number;
    isLoading: boolean;
    setWishlist: (items: WishlistItem[], count: number) => void;
    setLoading: (isLoading: boolean) => void;
    fetchWishlist: () => Promise<void>;
}

import { WishlistService } from "@/services/wishlist.service";

export const useWishlistStore = create<WishlistState>((set) => ({
    items: [],
    count: 0,
    isLoading: false,
    setWishlist: (items, count) => set({ items, count }),
    setLoading: (isLoading) => set({ isLoading }),
    fetchWishlist: async () => {
        set({ isLoading: true });
        try {
            const { data } = await WishlistService.getMyWishlist();
            set({ items: data.items, count: data.items.length });
        } finally {
            set({ isLoading: false });
        }
    },
}));
