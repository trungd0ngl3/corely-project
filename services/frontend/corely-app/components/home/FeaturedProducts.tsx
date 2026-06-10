"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { SectionTitle } from "@/components/ui/section-title";
import { FEATURED_PRODUCTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TABS = ["All", "Gaming", "Workstation", "Laptop", "Accessories"];

export function FeaturedProducts() {
    const [activeTab, setActiveTab] = useState("All");

    const filteredProducts = activeTab === "All"
        ? FEATURED_PRODUCTS
        : FEATURED_PRODUCTS.filter(p => p.category === activeTab);

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
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}