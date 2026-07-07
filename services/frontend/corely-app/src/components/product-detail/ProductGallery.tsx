"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/mock-product-detail";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const selected = images[selectedIndex];

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div
                className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-surface-container-low"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
            >
                <Image
                    src={selected.url}
                    alt={selected.alt}
                    fill
                    className={cn(
                        "object-contain p-6 transition-transform duration-300",
                        isZoomed && "scale-[2]"
                    )}
                    style={
                        isZoomed
                            ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
                            : undefined
                    }
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
                {images.map((img, index) => (
                    <button
                        key={img.id}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                            "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-container-low transition-all",
                            selectedIndex === index
                                ? "ring-2 ring-primary ring-offset-2"
                                : "opacity-60 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={img.url}
                            alt={img.alt}
                            fill
                            className="object-contain p-2"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}