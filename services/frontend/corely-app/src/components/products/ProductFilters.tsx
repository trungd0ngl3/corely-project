"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { TechnicalFilters } from "./TechnicalFilters";

interface FilterGroupProps {
    title: string;
    children: React.ReactNode;
}

function FilterGroup({ title, children }: FilterGroupProps) {
    return (
        <div className="border-b border-outline-variant py-6 last:border-0">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {title}
            </h3>
            <div className="flex flex-col gap-3">
                {children}
            </div>
        </div>
    );
}

interface CheckboxFilterProps {
    label: string;
    value: string;
    paramKey: string;
}

function CheckboxFilter({ label, value, paramKey }: CheckboxFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentValues = searchParams.get(paramKey)?.split(",") || [];
    const isChecked = currentValues.includes(value);

    const toggleFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        let newValues: string[];

        if (isChecked) {
            newValues = currentValues.filter(v => v !== value);
        } else {
            newValues = [...currentValues, value];
        }

        if (newValues.length > 0) {
            params.set(paramKey, newValues.join(","));
        } else {
            params.delete(paramKey);
        }

        params.set("page", "1");
        router.push(`/products?${params.toString()}`);
    };

    return (
        <label className="flex cursor-pointer items-center gap-3 group">
            <div className={cn(
                "flex h-5 w-5 items-center justify-center rounded border transition-all",
                isChecked ? "bg-primary-container border-primary-container" : "border-outline-variant group-hover:border-primary-container"
            )}>
                {isChecked && (
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className={cn(
                "text-sm transition-colors",
                isChecked ? "font-bold text-on-surface" : "text-on-surface-variant group-hover:text-on-surface"
            )}>
                {label}
            </span>
        </label>
    );
}

export function ProductFilters() {
    return (
        <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
            <FilterGroup title="Brands">
                <CheckboxFilter label="ASUS" value="asus" paramKey="brand" />
                <CheckboxFilter label="MSI" value="msi" paramKey="brand" />
                <CheckboxFilter label="Gigabyte" value="gigabyte" paramKey="brand" />
                <CheckboxFilter label="Intel" value="intel" paramKey="brand" />
                <CheckboxFilter label="AMD" value="amd" paramKey="brand" />
                <CheckboxFilter label="Corsair" value="corsair" paramKey="brand" />
                <CheckboxFilter label="Logitech" value="logitech" paramKey="brand" />
                <CheckboxFilter label="Samsung" value="samsung" paramKey="brand" />
            </FilterGroup>

            <FilterGroup title="Price">
                <CheckboxFilter label="Under 5M" value="0-5000000" paramKey="price" />
                <CheckboxFilter label="5M - 10M" value="5000000-10000000" paramKey="price" />
                <CheckboxFilter label="10M - 20M" value="10000000-20000000" paramKey="price" />
                <CheckboxFilter label="20M - 50M" value="20000000-50000000" paramKey="price" />
                <CheckboxFilter label="Above 50M" value="50000000-999999999" paramKey="price" />
            </FilterGroup>

            <FilterGroup title="Category">
                <CheckboxFilter label="CPU" value="cpu" paramKey="category" />
                <CheckboxFilter label="GPU" value="gpu" paramKey="category" />
                <CheckboxFilter label="RAM" value="ram" paramKey="category" />
                <CheckboxFilter label="SSD" value="ssd" paramKey="category" />
                <CheckboxFilter label="Laptop" value="laptop" paramKey="category" />
                <CheckboxFilter label="Monitor" value="monitor" paramKey="category" />
            </FilterGroup>

            <FilterGroup title="GPU Chipset">
                <CheckboxFilter label="RTX 4060" value="rtx4060" paramKey="chipset" />
                <CheckboxFilter label="RTX 4070" value="rtx4070" paramKey="chipset" />
                <CheckboxFilter label="RTX 5070" value="rtx5070" paramKey="chipset" />
                <CheckboxFilter label="RTX 5080" value="rtx5080" paramKey="chipset" />
                <CheckboxFilter label="RTX 5090" value="rtx5090" paramKey="chipset" />
            </FilterGroup>

            <FilterGroup title="VRAM">
                <CheckboxFilter label="8GB" value="8gb" paramKey="vram" />
                <CheckboxFilter label="12GB" value="12gb" paramKey="vram" />
                <CheckboxFilter label="16GB" value="16gb" paramKey="vram" />
                <CheckboxFilter label="24GB" value="24gb" paramKey="vram" />
            </FilterGroup>

            <FilterGroup title="Rating">
                <CheckboxFilter label="★★★★★" value="5" paramKey="rating" />
                <CheckboxFilter label="★★★★☆ & Up" value="4" paramKey="rating" />
                <CheckboxFilter label="★★★☆☆ & Up" value="3" paramKey="rating" />
            </FilterGroup>

            <FilterGroup title="Availability">
                <CheckboxFilter label="In Stock" value="in_stock" paramKey="stock" />
                <CheckboxFilter label="Pre-order" value="pre_order" paramKey="stock" />
            </FilterGroup>

            <FilterGroup title="Promotion">
                <CheckboxFilter label="Flash Sale" value="flash_sale" paramKey="promo" />
                <CheckboxFilter label="Discount > 10%" value="10" paramKey="promo" />
                <CheckboxFilter label="Free Shipping" value="free_shipping" paramKey="promo" />
            </FilterGroup>

            <TechnicalFilters />
        </div>
    );
}
