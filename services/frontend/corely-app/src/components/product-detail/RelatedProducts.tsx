import Link from "next/link";
import Image from "next/image";
import type { RelatedProduct } from "@/lib/mock-product-detail";

interface RelatedProductsProps {
    products: RelatedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    const formatPrice = (val: number) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

    return (
        <section>
            <h2 className="mb-4 text-xl font-bold text-on-surface">Similar Products</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="group rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 transition-all hover:border-primary/30 hover:shadow-md"
                    >
                        <div className="relative mx-auto mb-3 aspect-square w-full max-w-[160px]">
                            <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                className="object-contain transition-transform group-hover:scale-105"
                            />
                        </div>
                        <h3 className="line-clamp-2 text-sm font-semibold text-on-surface">
                            {p.name}
                        </h3>
                        <p className="mt-1 text-sm font-bold text-primary">
                            {formatPrice(p.price)}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}