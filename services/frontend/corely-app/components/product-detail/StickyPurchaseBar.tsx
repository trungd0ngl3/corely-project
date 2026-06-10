"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Zap } from "lucide-react";

interface StickyPurchaseBarProps {
    name: string;
    price: number;
    stock: number;
}

export function StickyPurchaseBar({ name, price, stock }: StickyPurchaseBarProps) {
    const [visible, setVisible] = useState(false);

    const formatPrice = (val: number) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 600);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant bg-surface/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
                <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-on-surface line-clamp-1">{name}</p>
                    <p className="text-lg font-bold text-primary">{formatPrice(price)}</p>
                </div>
                <p className="text-lg font-bold text-primary sm:hidden">{formatPrice(price)}</p>
                <div className="flex items-center gap-3">
                    <button
                        disabled={stock === 0}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-container active:scale-[0.98] disabled:opacity-50"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add To Cart
                    </button>
                    <button
                        disabled={stock === 0}
                        className="flex items-center gap-2 rounded-xl bg-orange px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange/90 active:scale-[0.98] disabled:opacity-50 sm:hidden"
                    >
                        <Zap className="h-4 w-4" />
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}