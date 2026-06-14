"use client";

import { useCart } from "@/store/use-cart";
import { FEATURED_PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/ui/product-card";

export function RecommendedProducts() {
    const { items } = useCart();

    // In a real app, this would fetch from API based on cart items
    const recommended = FEATURED_PRODUCTS.slice(0, 4);

    if (items.length === 0 || recommended.length === 0) return null;

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Bought Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {recommended.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        brand={product.brand}
                        rating={product.rating}
                    />
                ))}
            </div>
        </div>
    );
}