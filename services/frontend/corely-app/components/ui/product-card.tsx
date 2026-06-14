"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    brand: string;
    rating?: number;
    isFlashSale?: boolean;
    soldPercentage?: number;
    className?: string;
}

export function ProductCard({
    name,
    price,
    originalPrice,
    image,
    brand,
    rating,
    isFlashSale,
    soldPercentage,
    className
}: ProductCardProps) {
    const formatPrice = (val: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(val);
    };

    return (
        <div className={cn(
            "group relative flex flex-col rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg",
            className
        )}>
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-container-low">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain p-4 transition-transform group-hover:scale-110"
                />
                <button className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-on-surface-variant backdrop-blur-sm transition-colors hover:text-error">
                    <Heart className="h-5 w-5" />
                </button>
                {isFlashSale && (
                    <div className="absolute left-0 top-0 rounded-br-xl bg-error px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        Flash Sale
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="mt-4 flex flex-1 flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
                    {brand}
                </span>
                <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-on-surface group-hover:text-primary">
                    {name}
                </h3>

                {rating !== undefined && (
                    <div className="mt-2 flex items-center gap-1">
                        <div className="flex items-center text-yellow-500">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="ml-1 text-xs font-bold text-on-surface">{rating}</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant/40">(123)</span>
                    </div>
                )}

                <div className="mt-auto pt-4">
                    <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-lg font-bold text-primary">
                            {formatPrice(price)}
                        </span>
                        {originalPrice && (
                            <span className="text-xs text-on-surface-variant/40 line-through">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                    </div>

                    {isFlashSale && soldPercentage !== undefined && (
                        <div className="mt-2">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
                                <div
                                    className="h-full bg-error transition-all"
                                    style={{ width: `${soldPercentage}%` }}
                                />
                            </div>
                            <span className="mt-1 block text-[10px] font-bold text-on-surface-variant/60">
                                Sold {soldPercentage}%
                            </span>
                        </div>
                    )}

                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-white transition-all hover:bg-primary-container active:scale-95">
                        <ShoppingCart className="h-4 w-4" />
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
}