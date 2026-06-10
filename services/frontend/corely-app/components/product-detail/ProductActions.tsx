"use client";

import { useState } from "react";
import { ShoppingCart, Zap, Heart, ArrowLeftRight, Plus, Minus } from "lucide-react";
import { useCart } from "@/store/use-cart";

interface ProductActionsProps {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    stock: number;
}

export function ProductActions({ id, name, price, image, brand, stock }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);
    const addItem = useCart((s) => s.addItem);

    const handleAddToCart = () => {
        addItem({ id, name, price, image, brand, quantity });
    };

    return (
        <div className="space-y-4">
            {/* Quantity */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-on-surface-variant">Quantity</span>
                <div className="flex items-center rounded-xl border border-outline-variant">
                    <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex h-10 w-10 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex h-10 w-12 items-center justify-center border-x border-outline-variant text-sm font-bold text-on-surface">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                        className="flex h-10 w-10 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
                        disabled={quantity >= stock}
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <button
                    onClick={handleAddToCart}
                    disabled={stock === 0}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-container active:scale-[0.98] disabled:opacity-50"
                >
                    <ShoppingCart className="h-5 w-5" />
                    Add To Cart
                </button>
                <button
                    disabled={stock === 0}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange py-3.5 text-sm font-bold text-white transition-all hover:bg-orange/90 active:scale-[0.98] disabled:opacity-50"
                >
                    <Zap className="h-5 w-5" />
                    Buy Now
                </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-3">
                <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-all ${wishlisted
                        ? "border-error bg-error/5 text-error"
                        : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                        }`}
                >
                    <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
                    Wishlist
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-outline-variant py-2.5 text-sm font-medium text-on-surface-variant transition-all hover:border-primary hover:text-primary">
                    <ArrowLeftRight className="h-4 w-4" />
                    Compare
                </button>
            </div>
        </div>
    );
}