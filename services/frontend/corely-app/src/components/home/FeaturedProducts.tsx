"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductService } from "@/services/product.service";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

const TABS = ["All", "Gaming", "Workstation", "Laptop", "Accessories"];

export function FeaturedProducts() {
    const [activeTab, setActiveTab] = useState("All");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ProductService.getActiveProducts()
            .then((data) => setProducts(data.content))
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts = activeTab === "All"
        ? products
        : products.filter(p => p.category === activeTab);

    if (loading) return <div className="py-16 text-center">Loading...</div>;

    return (
        <section className="py-16 bg-surface">
            <div className="container-max">
                <SectionTitle
                    title="Featured Products"
                    subtitle="Our Top Picks"
                    href="/shop"
                />

                <div className="mb-8 flex flex-wrap gap-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                                activeTab === tab
                                    ? "bg-primary-container text-white shadow-lg shadow-primary-container/20"
                                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0]}
                            brand={product.brand}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
