"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/use-wishlist";

export function WishlistButton() {
    const count = useWishlistStore((state) => state.count);

    return (
        <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative hidden sm:flex hover:bg-primary/5 transition-all duration-200">
                <Heart className="h-5 w-5" />
                {count > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-flash text-[10px] font-bold text-white">
                        {count}
                    </span>
                )}
            </Button>
        </Link>
    );
}