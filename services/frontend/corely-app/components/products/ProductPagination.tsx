"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductPaginationProps {
    className?: string;
}

export function ProductPagination({ className }: ProductPaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1");
    const totalPages = 5; // Mock total pages

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest transition-all hover:border-primary-container disabled:opacity-30 disabled:hover:border-outline-variant"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all",
                            currentPage === page
                                ? "bg-primary-container text-white shadow-md"
                                : "border border-outline-variant bg-surface-container-lowest hover:border-primary-container"
                        )}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest transition-all hover:border-primary-container disabled:opacity-30 disabled:hover:border-outline-variant"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}