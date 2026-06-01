const categories = [
    { name: "CPU", icon: "⚡", desc: "Bộ xử lý" },
    { name: "GPU", icon: "🎮", desc: "Card đồ họa" },
    { name: "RAM", icon: "🧠", desc: "Bộ nhớ" },
    { name: "SSD", icon: "💾", desc: "Ổ lưu trữ" },
    { name: "Mainboard", icon: "🔧", desc: "Bo mạch chủ" },
    { name: "PSU", icon: "🔌", desc: "Nguồn máy tính" },
    { name: "Case", icon: "🖥️", desc: "Vỏ máy tính" },
    { name: "Tản nhiệt", icon: "❄️", desc: "Cooling" },
];

export default function CategoryGrid() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Danh mục linh kiện</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {categories.map((cat) => (
                    <a
                        key={cat.name}
                        href="#"
                        className="group flex flex-col items-center gap-3 p-4 bg-surface rounded-xl border border-border hover:border-primary/50 hover:bg-surface-hover transition-all duration-200"
                    >
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                            <p className="text-xs text-muted">{cat.desc}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}