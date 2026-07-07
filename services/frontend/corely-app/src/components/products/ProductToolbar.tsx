"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
    { label: "Newest", value: "newest" },
    { label: "Price Low → High", value: "price_asc" },
    { label: "Price High → Low", value: "price_desc" },
    { label: "Best Selling", value: "best_selling" },
    { label: "Highest Rated", value: "rating_desc" },
    { label: "Discount", value: "discount_desc" },
];

export function ProductToolbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "newest";
    const viewMode = searchParams.get("view") || "grid";

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-outline-variant pb-4">
            <div className="text-sm text-on-surface-variant/80">
                Showing <span className="font-bold text-on-surface">1-24</span> of <span className="font-bold text-on-surface">586</span> products
            </div>

            <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative group">
                    <button className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-medium transition-all hover:border-primary-container">
                        Sort: {SORT_OPTIONS.find(opt => opt.value === currentSort)?.label}
                        <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute right-0 top-full z-20 mt-1 hidden w-48 rounded-xl border border-outline-variant bg-surface-container-lowest p-1 shadow-level-3 group-hover:block">
                        {SORT_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateParams("sort", option.value)}
                                className={cn(
                                    "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-surface-container-low",
                                    currentSort === option.value && "bg-primary-container/10 font-bold text-primary-container"
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest p-1">
                    <button
                        onClick={() => updateParams("view", "grid")}
                        className={cn(
                            "rounded-md p-1.5 transition-all",
                            viewMode === "grid" ? "bg-primary-container text-white shadow-sm" : "text-on-surface-variant/60 hover:bg-surface-container-low"
                        )}
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => updateParams("view", "list")}
                        className={cn(
                            "rounded-md p-1.5 transition-all",
                            viewMode === "list" ? "bg-primary-container text-white shadow-sm" : "text-on-surface-variant/60 hover:bg-surface-container-low"
                        )}
                    >
                        <List className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}