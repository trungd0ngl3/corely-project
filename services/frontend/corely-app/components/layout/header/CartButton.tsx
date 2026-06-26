"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";
import { useCartAnimation } from "@/hooks/use-cart-animation";
import { cn } from "@/lib/utils";

export function CartButton() {
    const totalItems = useCart((state) => state.totalItems());
    const { animate } = useCartAnimation(totalItems);

    return (
        <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 transition-all duration-200">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                    <span
                        className={cn(
                            "absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-flash text-[10px] font-bold text-white transition-transform duration-300",
                            animate ? "scale-125" : "scale-100"
                        )}
                    >
                        {totalItems}
                    </span>
                )}
            </Button>
        </Link>
    );
}