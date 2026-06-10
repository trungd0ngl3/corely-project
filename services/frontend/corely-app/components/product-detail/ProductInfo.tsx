import { Star } from "lucide-react";

interface ProductInfoProps {
    brand: string;
    name: string;
    rating: number;
    reviewCount: number;
}

export function ProductInfo({ brand, name, rating, reviewCount }: ProductInfoProps) {
    return (
        <div>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">
                {brand}
            </span>
            <h1 className="mt-1 text-2xl font-bold text-on-surface lg:text-3xl">
                {name}
            </h1>
            <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.round(rating) ? "fill-yellow-500 text-yellow-500" : "fill-surface-container-high text-surface-container-high"}`}
                        />
                    ))}
                </div>
                <span className="text-sm font-bold text-on-surface">{rating}</span>
                <span className="text-sm text-on-surface-variant/60">
                    ({reviewCount} reviews)
                </span>
            </div>
        </div>
    );
}