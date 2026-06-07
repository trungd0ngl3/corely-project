"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    brand: string;
    isFlashSale?: boolean;
    soldPercentage?: number;
    rating?: number;
    className?: string;
}

export function ProductCard({
    id,
    name,
    price,
    originalPrice,
    image,
    brand,
    isFlashSale,
    soldPercentage,
    rating,
    className,
}: ProductCardProps) {
    const addItem = useCart((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({ id, name, price, image, brand, quantity: 1 });
    };

    return (
        <div className={cn(
            "group relative flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-level-1 transition-all hover:shadow-level-2",
            className
        )}>
            {isFlashSale && (
                <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-flash px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    Flash Sale
                </div>
            )}
            <button className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-on-surface-variant backdrop-blur-sm transition-colors hover:text-primary-container">
                <Heart className="h-4 w-4" />
            </button>

            <Link href={`/product/${id}`} className="flex-1">
                <div className="aspect-square overflow-hidden bg-surface-container-low p-6">
                    <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="flex flex-col p-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
                        {brand}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-on-surface group-hover:text-primary-container transition-colors">
                        {name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-primary-container">
                                ${price.toLocaleString()}
                            </span>
                            {originalPrice && (
                                <span className="text-xs text-on-surface-variant/50 line-through">
                                    ${originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                        {rating && (
                            <div className="flex items-center gap-1 text-xs font-bold text-on-surface">
                                <span className="text-orange">★</span>
                                {rating}
                            </div>
                        )}
                    </div>

                    {isFlashSale && soldPercentage !== undefined && (
                        <div className="mt-4">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">
                                <span>Sold {soldPercentage}%</span>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
                                <div
                                    className="h-full bg-flash transition-all duration-500"
                                    style={{ width: `${soldPercentage}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-4 pt-0">
                <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="w-full gap-2 text-xs font-bold uppercase tracking-wider"
                >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
