"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveFiltersProps {
    className?: string;
}

export function ActiveFilters({ className }: ActiveFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const filters: { key: string; value: string; label: string }[] = [];

    searchParams.forEach((value, key) => {
        if (key === "page" || key === "sort" || key === "view") return;

        const values = value.split(",");
        values.forEach(v => {
            filters.push({
                key,
                value: v,
                label: `${key.charAt(0).toUpperCase() + key.slice(1)}: ${v}`
            });
        });
    });

    const removeFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentValues = params.get(key)?.split(",") || [];
        const newValues = currentValues.filter(v => v !== value);

        if (newValues.length > 0) {
            params.set(key, newValues.join(","));
        } else {
            params.delete(key);
        }

        params.set("page", "1");
        router.push(`/products?${params.toString()}`);
    };

    const clearAll = () => {
        router.push("/products");
    };

    if (filters.length === 0) return null;

    return (
        <div className={cn("flex flex-wrap items-center gap-2", className)}>
            {filters.map((filter, index) => (
                <div
                    key={`${filter.key}-${filter.value}-${index}`}
                    className="flex items-center gap-1 rounded-full bg-primary-container/10 px-3 py-1 text-xs font-bold text-primary-container"
                >
                    {filter.label}
                    <button
                        onClick={() => removeFilter(filter.key, filter.value)}
                        className="ml-1 rounded-full p-0.5 hover:bg-primary-container/20 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ))}
            <button
                onClick={clearAll}
                className="text-xs font-bold text-on-surface-variant/60 hover:text-error transition-colors"
            >
                Clear All
            </button>
        </div>
    );
}