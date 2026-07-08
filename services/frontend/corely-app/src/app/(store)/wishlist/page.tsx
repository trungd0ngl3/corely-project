'use client'
import { useEffect } from "react";
import { WishlistGrid } from "@/components/wishlist/WishlistGrid";
import { useWishlistStore } from "@/hooks/use-wishlist";

export default function WishlistPage() {
    const { fetchWishlist } = useWishlistStore();

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
            <WishlistGrid />
        </div>
    );
}
