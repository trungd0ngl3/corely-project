"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";

const slides = [
    {
        title: "RTX 5090 Đã Có Hàng",
        subtitle: "Hiệu năng đỉnh cao cho Gaming & AI",
        description: "Card đồ họa thế hệ mới nhất từ NVIDIA. Đặt hàng ngay với ưu đãi độc quyền tại Corely.",
        cta: "Mua ngay",
        bg: "from-blue-900/40 to-purple-900/40",
        accent: "🎮",
    },
    {
        title: "PC Gaming Build Sẵn",
        subtitle: "Từ 15 triệu - Sẵn sàng chiến game",
        description: "Cấu hình tối ưu, bảo hành 3 năm, hỗ trợ nâng cấp miễn phí trong 12 tháng.",
        cta: "Xem cấu hình",
        bg: "from-emerald-900/40 to-cyan-900/40",
        accent: "🖥️",
    },
    {
        title: "Flash Sale Cuối Tuần",
        subtitle: "Giảm đến 40% linh kiện hot",
        description: "CPU, RAM, SSD chính hãng giá sốc. Số lượng có hạn, nhanh tay kẻo hết!",
        cta: "Xem ngay",
        bg: "from-red-900/40 to-orange-900/40",
        accent: "🔥",
    },
];

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[current];

    return (
        <section className="relative overflow-hidden">
            <div className={`bg-gradient-to-br ${slide.bg} transition-all duration-700`}>
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-5">
                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
                            {slide.subtitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                            {slide.title}
                        </h1>
                        <p className="text-muted text-lg max-w-lg">{slide.description}</p>
                        <div className="flex gap-3">
                            <Button size="lg">{slide.cta}</Button>
                            <Button variant="outline" size="lg">
                                Tư vấn miễn phí
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="text-[120px] md:text-[180px] animate-bounce-slow select-none">
                            {slide.accent}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === current ? "bg-primary w-8" : "bg-muted/50 hover:bg-muted"}`}
                    />
                ))}
            </div>
        </section>
    );
}