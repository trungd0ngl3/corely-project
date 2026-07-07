import Image from "next/image";
import { Plus, ShoppingCart } from "lucide-react";
import type { BundleItem } from "@/lib/mock-product-detail";

interface BundleSuggestionProps {
    items: BundleItem[];
    bundlePrice: number;
}

export function BundleSuggestion({ items, bundlePrice }: BundleSuggestionProps) {
    const formatPrice = (val: number) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

    const totalIndividual = items.reduce((sum, item) => sum + item.price, 0);
    const savings = totalIndividual - bundlePrice;

    return (
        <section>
            <h2 className="mb-4 text-xl font-bold text-on-surface">Frequently Bought Together</h2>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {items.map((item, i) => (
                        <div key={item.id} className="flex items-center gap-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative h-24 w-24">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="rounded-xl object-contain"
                                    />
                                </div>
                                <p className="max-w-[120px] text-center text-xs font-medium text-on-surface line-clamp-2">
                                    {item.name}
                                </p>
                                <p className="text-xs text-on-surface-variant">
                                    {formatPrice(item.price)}
                                </p>
                            </div>
                            {i < items.length - 1 && (
                                <Plus className="h-5 w-5 shrink-0 text-on-surface-variant/40" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-col items-center gap-3 border-t border-outline-variant pt-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-primary">
                            {formatPrice(bundlePrice)}
                        </p>
                        <p className="text-sm text-success font-semibold">
                            Save {formatPrice(savings)}
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary-container active:scale-[0.98]">
                        <ShoppingCart className="h-4 w-4" />
                        Add Bundle To Cart
                    </button>
                </div>
            </div>
        </section>
    );
}