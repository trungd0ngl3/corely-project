"use client";

import { useState, useEffect } from "react";
import ProductCard, { Product } from "../ui/ProductCard";

const flashProducts: Product[] = [
    { id: 1, name: "AMD Ryzen 7 9800X3D - 8 Cores / 16 Threads", price: 11990000, originalPrice: 14490000, image: "⚡", badge: "HOT", rating: 5, reviews: 234 },
    { id: 2, name: "Kingston Fury Beast DDR5 32GB (2x16GB) 6000MHz", price: 2490000, originalPrice: 3190000, image: "🧠", rating: 4, reviews: 128 },
    { id: 3, name: "Samsung 990 Pro 2TB NVMe PCIe 4.0 M.2 SSD", price: 4290000, originalPrice: 5490000, image: "💾", badge: "SALE", rating: 5, reviews: 89 },
    { id: 4, name: "Corsair RM850x 850W 80+ Gold Full Modular", price: 2790000, originalPrice: 3490000, image: "🔌", rating: 4, reviews: 156 },
];

function useCountdown(targetDate: Date) {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
            const now = new Date().getTime();
            const diff = targetDate.getTime() - now;
            if (diff <= 0) return;
            setTimeLeft({
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return timeLeft;
}

export default function FlashSale() {
    const [endDate] = useState(() => {
        const d = new Date();
        d.setHours(d.getHours() + 8);
        return d;
    });
    const { hours, minutes, seconds } = useCountdown(endDate);

    return (
        <section id="flashsale" className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        🔥 Flash Sale
                    </h2>
                    <p className="text-sm text-muted mt-1">Ưu đãi có hạn, nhanh tay kẻo lỡ!</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted">Kết thúc sau:</span>
                    {[
                        { val: hours, label: "giờ" },
                        { val: minutes, label: "phút" },
                        { val: seconds, label: "giây" },
                    ].map((t, i) => (
                        <div key={i} className="flex items-center gap-1">
                            <span className="bg-danger text-white text-lg font-bold w-10 h-10 rounded-lg flex items-center justify-center">
                                {String(t.val).padStart(2, "0")}
                            </span>
                            {i < 2 && <span className="text-danger font-bold">:</span>}
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {flashProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}