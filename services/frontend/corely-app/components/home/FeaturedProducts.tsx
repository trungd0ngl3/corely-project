import ProductCard, { Product } from "../ui/ProductCard";

const featuredProducts: Product[] = [
    { id: 10, name: "NVIDIA GeForce RTX 5070 Ti Founders Edition 16GB", price: 18990000, image: "🎮", badge: "MỚI", rating: 5, reviews: 67 },
    { id: 11, name: "Intel Core Ultra 9 285K - 24 Cores / 24 Threads", price: 15490000, image: "⚡", rating: 5, reviews: 145 },
    { id: 12, name: "ASUS ROG Strix B860-F Gaming WiFi DDR5", price: 6990000, image: "🔧", rating: 4, reviews: 92 },
    { id: 13, name: "G.Skill Trident Z5 RGB DDR5 32GB 7200MHz CL34", price: 3890000, image: "🧠", rating: 5, reviews: 78 },
    { id: 14, name: "WD Black SN850X 4TB NVMe Gen4 SSD", price: 7490000, originalPrice: 8990000, image: "💾", rating: 5, reviews: 203 },
    { id: 15, name: "NZXT H7 Flow RGB Mid Tower ATX Case White", price: 3290000, image: "🖥️", rating: 4, reviews: 167 },
    { id: 16, name: "Noctua NH-D15 G2 Chromax.Black CPU Cooler", price: 3190000, image: "❄️", rating: 5, reviews: 312 },
    { id: 17, name: "Corsair HX1200i 1200W 80+ Platinum Full Modular", price: 5990000, originalPrice: 6790000, image: "🔌", rating: 5, reviews: 56 },
];

export default function FeaturedProducts() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Sản phẩm nổi bật</h2>
                    <p className="text-sm text-muted mt-1">Được lựa chọn nhiều nhất tuần này</p>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                    Xem tất cả →
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}