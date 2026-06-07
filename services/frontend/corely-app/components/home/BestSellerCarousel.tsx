import { ProductCard } from "@/components/ui/product-card";
import { SectionTitle } from "@/components/ui/section-title";
import { FEATURED_PRODUCTS } from "@/lib/mock-data";

export function BestSellerCarousel() {
    // Using featured products as placeholder for best sellers
    return (
        <section className="py-16 bg-surface">
            <div className="container-max">
                <SectionTitle
                    title="Best Sellers"
                    subtitle="Most Popular Right Now"
                    href="/shop?sort=popular"
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURED_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}