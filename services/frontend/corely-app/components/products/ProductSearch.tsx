"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (keyword) {
                params.set("keyword", keyword);
            } else {
                params.delete("keyword");
            }
            params.set("page", "1"); // Reset to page 1 on search
            router.push(`/products?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);
    }, [keyword, router, searchParams]);

    return (
        <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant/50" />
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products (name, brand, SKU, category)..."
                className="h-12 w-full rounded-full border border-outline-variant bg-surface-container-lowest pl-12 pr-6 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/5 transition-all"
            />
        </div>
    );
}