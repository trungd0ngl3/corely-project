"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

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

export function TechnicalFilters() {
    return (
        <>
            <FilterGroup title="GPU Chipset">
                <CheckboxFilter label="RTX 4060" value="rtx4060" paramKey="chipset" />
                <CheckboxFilter label="RTX 4070" value="rtx4070" paramKey="chipset" />
                <CheckboxFilter label="RTX 5070" value="rtx5070" paramKey="chipset" />
                <CheckboxFilter label="RTX 5080" value="rtx5080" paramKey="chipset" />
                <CheckboxFilter label="RTX 5090" value="rtx5090" paramKey="chipset" />
            </FilterGroup>

            <FilterGroup title="CPU Socket">
                <CheckboxFilter label="LGA1700" value="lga1700" paramKey="socket" />
                <CheckboxFilter label="AM5" value="am5" paramKey="socket" />
                <CheckboxFilter label="AM4" value="am4" paramKey="socket" />
            </FilterGroup>

            <FilterGroup title="RAM Type">
                <CheckboxFilter label="DDR4" value="ddr4" paramKey="ram_type" />
                <CheckboxFilter label="DDR5" value="ddr5" paramKey="ram_type" />
            </FilterGroup>

            <FilterGroup title="SSD Interface">
                <CheckboxFilter label="NVMe PCIe 4.0" value="nvme_gen4" paramKey="ssd_type" />
                <CheckboxFilter label="NVMe PCIe 5.0" value="nvme_gen5" paramKey="ssd_type" />
                <CheckboxFilter label="SATA III" value="sata" paramKey="ssd_type" />
            </FilterGroup>
        </>
    );
}