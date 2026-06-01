const brands = [
    { name: "Intel", letter: "Intel" },
    { name: "AMD", letter: "AMD" },
    { name: "NVIDIA", letter: "NVIDIA" },
    { name: "ASUS", letter: "ASUS" },
    { name: "MSI", letter: "MSI" },
    { name: "Gigabyte", letter: "GIGA" },
    { name: "Corsair", letter: "CORS" },
    { name: "Samsung", letter: "SAMS" },
    { name: "Kingston", letter: "KING" },
    { name: "WD", letter: "WD" },
    { name: "Noctua", letter: "NOC" },
    { name: "NZXT", letter: "NZXT" },
];

export default function BrandShowcase() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Thương hiệu đối tác</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {brands.map((brand) => (
                    <div
                        key={brand.name}
                        className="flex items-center justify-center h-16 bg-surface rounded-xl border border-border hover:border-primary/30 hover:bg-surface-hover transition-all duration-200 cursor-pointer group"
                    >
                        <span className="text-sm font-bold text-muted group-hover:text-primary transition-colors tracking-wider">
                            {brand.letter}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}