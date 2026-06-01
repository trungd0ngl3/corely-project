import Button from "../ui/Button";

const prebuiltPCs = [
    {
        tier: "Office",
        name: "Corely Work Pro",
        price: 12990000,
        icon: "💼",
        color: "from-sky-500/20 to-blue-600/20",
        borderColor: "hover:border-sky-500/50",
        specs: ["Intel Core i5-14400", "16GB DDR5 4800", "512GB NVMe SSD", "Intel UHD 730", "Case mATX + 550W"],
        highlight: "Văn phòng mượt mà",
    },
    {
        tier: "Gaming",
        name: "Corely Battle X",
        price: 25990000,
        icon: "🎮",
        color: "from-purple-500/20 to-pink-600/20",
        borderColor: "hover:border-purple-500/50",
        specs: ["AMD Ryzen 7 7800X3D", "32GB DDR5 6000", "1TB NVMe Gen4 SSD", "RTX 4070 Super 12GB", "Case ATX RGB + 750W Gold"],
        highlight: "Bán chạy nhất",
        featured: true,
    },
    {
        tier: "Workstation",
        name: "Corely Creator Ultra",
        price: 52990000,
        icon: "🚀",
        color: "from-amber-500/20 to-orange-600/20",
        borderColor: "hover:border-amber-500/50",
        specs: ["Intel Core i9-14900K", "64GB DDR5 5600", "2TB NVMe Gen4 SSD", "RTX 4080 Super 16GB", "Case Full Tower + 1000W Platinum"],
        highlight: "Render & AI",
    },
];

function formatPrice(price: number) {
    return price.toLocaleString("vi-VN") + "₫";
}

export default function PrebuiltPCSection() {
    return (
        <section id="prebuilt" className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-foreground">PC Build Sẵn</h2>
                <p className="text-sm text-muted mt-2">Cấu hình tối ưu, test kỹ, bảo hành 3 năm, ship toàn quốc</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {prebuiltPCs.map((pc) => (
                    <div
                        key={pc.tier}
                        className={`relative bg-gradient-to-br ${pc.color} rounded-2xl border border-border ${pc.borderColor} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${pc.featured ? "ring-2 ring-purple-500/50 scale-[1.02]" : ""}`}
                    >
                        {pc.featured && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                                ⭐ PHỔ BIẾN NHẤT
                            </span>
                        )}
                        <div className="text-center mb-6">
                            <span className="text-5xl">{pc.icon}</span>
                            <p className="text-xs text-muted mt-2 uppercase tracking-wider">{pc.tier}</p>
                            <h3 className="text-xl font-bold text-foreground mt-1">{pc.name}</h3>
                            <p className="text-xs text-accent mt-1">{pc.highlight}</p>
                        </div>
                        <ul className="space-y-2 mb-6">
                            {pc.specs.map((spec) => (
                                <li key={spec} className="flex items-center gap-2 text-sm text-foreground/80">
                                    <svg className="w-4 h-4 text-success shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {spec}
                                </li>
                            ))}
                        </ul>
                        <div className="text-center space-y-3">
                            <p className="text-2xl font-bold text-primary">{formatPrice(pc.price)}</p>
                            <Button className="w-full" variant={pc.featured ? "primary" : "outline"}>
                                Đặt mua ngay
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}