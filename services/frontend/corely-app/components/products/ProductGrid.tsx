"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/product-card";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const MOCK_PRODUCTS = [
    {
        id: "1",
        name: "ASUS ROG Strix GeForce RTX 5070 Ti OC Edition 16GB GDDR7",
        price: 24990000,
        originalPrice: 27990000,
        image: "/next.svg", // Placeholder
        brand: "ASUS",
        rating: 5,
        isFlashSale: true,
        soldPercentage: 45
    },
    {
        id: "2",
        name: "MSI Gaming Slim GeForce RTX 5070 12GB GDDR7",
        price: 19990000,
        image: "/next.svg",
        brand: "MSI",
        rating: 4.8
    },
    {
        id: "3",
        name: "Gigabyte AORUS GeForce RTX 5080 Master 16GB GDDR7",
        price: 32990000,
        image: "/next.svg",
        brand: "Gigabyte",
        rating: 4.9
    },
    {
        id: "4",
        name: "Intel Core i9-14900K Desktop Processor 24 cores",
        price: 15490000,
        originalPrice: 16990000,
        image: "/next.svg",
        brand: "Intel",
        rating: 4.7
    },
    {
        id: "5",
        name: "AMD Ryzen 9 9950X 16-Core 32-Thread Desktop Processor",
        price: 18990000,
        image: "/next.svg",
        brand: "AMD",
        rating: 4.9
    },
    {
        id: "6",
        name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30",
        price: 3490000,
        image: "/next.svg",
        brand: "Corsair",
        rating: 4.8
    },
    {
        id: "7",
        name: "Samsung 990 PRO SSD 2TB PCIe 4.0 NVMe",
        price: 4590000,
        originalPrice: 5290000,
        image: "/next.svg",
        brand: "Samsung",
        rating: 5
    },
    {
        id: "8",
        name: "Logitech G Pro X Superlight 2 Wireless Gaming Mouse",
        price: 3890000,
        image: "/next.svg",
        brand: "Logitech",
        rating: 4.9
    }
];

export function ProductGrid() {
    const searchParams = useSearchParams();
    const viewMode = searchParams.get("view") || "grid";

    return (
        <div className={cn(
            "grid gap-6",
            viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
        )}>
            {MOCK_PRODUCTS.map((product) => (
                <ProductCard
                    key={product.id}
                    {...product}
                    className={cn(
                        viewMode === "list" && "flex-row items-center gap-6"
                    )}
                />
            ))}
        </div>
    );
}