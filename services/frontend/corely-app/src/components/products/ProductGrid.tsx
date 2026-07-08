"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/product-card";
import { ProductService } from "@/services/product.service";
import { ProductResponse } from "@/types/product";
import { cn } from "@/lib/utils";

export function ProductGrid() {
    const searchParams = useSearchParams();
    const viewMode = searchParams.get("view") || "grid";
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        ProductService.getProducts({
            page: Number(searchParams.get("page") || 1) - 1,
            size: 12,
        })
            .then((data) => setProducts(data.content))
            .finally(() => setLoading(false));
    }, [searchParams]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className={cn(
            "grid gap-6",
            viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
        )}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={product.discountPrice ?? product.price}
                    image={product.thumbnailUrl ?? product.imageUrls[0] ?? "/images/product-placeholder.png"}
                    brand={product.brandName}
                    className={cn(
                        viewMode === "list" && "flex-row items-center gap-6"
                    )}
                />
            ))}
        </div>
    );
}
