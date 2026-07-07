import { Zap } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import { SectionTitle } from "@/components/ui/section-title";
import { FLASH_SALE_PRODUCTS } from "@/lib/mock-data";

export function FlashSale() {
    return (
        <section className="py-16">
            <div className="container-max">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-orange">
                            <Zap className="h-6 w-6 fill-current" />
                            <h2 className="text-headline-md font-bold uppercase tracking-tight">Flash Sale</h2>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex h-9 w-11 items-center justify-center rounded bg-on-surface text-sm font-bold text-white">00</div>
                            <span className="text-xl font-bold text-on-surface">:</span>
                            <div className="flex h-9 w-11 items-center justify-center rounded bg-on-surface text-sm font-bold text-white">12</div>
                            <span className="text-xl font-bold text-on-surface">:</span>
                            <div className="flex h-9 w-11 items-center justify-center rounded bg-on-surface text-sm font-bold text-white">35</div>
                        </div>
                    </div>
                    <a href="/flash-sale" className="text-sm font-bold text-primary-container hover:underline">
                        View All Deals
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {FLASH_SALE_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}