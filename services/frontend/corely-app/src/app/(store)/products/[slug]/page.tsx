import { ProductService } from "@/services/product.service";
import { ProductGallery } from "@/components/product-detail/ProductGallery";
import { ProductInfo } from "@/components/product-detail/ProductInfo";
import { ProductPrice } from "@/components/product-detail/ProductPrice";
import { ProductActions } from "@/components/product-detail/ProductActions";
import { ProductSpecs } from "@/components/product-detail/ProductSpecs";
import { ProductHighlights } from "@/components/product-detail/ProductHighlights";
import { ReviewSummary } from "@/components/product-detail/ReviewSummary";
import { ReviewList } from "@/components/product-detail/ReviewList";
import { QuestionAnswer } from "@/components/product-detail/QuestionAnswer";
import { RelatedProducts } from "@/components/product-detail/RelatedProducts";
import { BundleSuggestion } from "@/components/product-detail/BundleSuggestion";
import { BenchmarkSection } from "@/components/product-detail/BenchmarkSection";
import { CompatibilityChecker } from "@/components/product-detail/CompatibilityChecker";
import { StickyPurchaseBar } from "@/components/product-detail/StickyPurchaseBar";

import { notFound } from "next/navigation";
import { log } from "console";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await ProductService.getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Cast to any to bypass TS errors caused by incorrect type inference of ProductService return
    const p = product as any;

    return (
        <div className="bg-surface min-h-screen pb-20">
            <div className="container-max py-8">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm text-on-surface-variant/60">
                    <span className="hover:text-primary-container cursor-pointer">Home</span>
                    <span className="mx-2">/</span>
                    <span className="hover:text-primary-container cursor-pointer">Products</span>
                    <span className="mx-2">/</span>
                    <span className="text-on-surface font-medium">{p.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Gallery */}
                    <div className="lg:col-span-7">
                        <ProductGallery
                            images={
                                p.imageUrls?.length > 0
                                    ? p.imageUrls.map((url: string, i: number) => ({
                                        id: String(i),
                                        url,
                                        alt: p.name,
                                    }))
                                    : [
                                        {
                                            id: "0",
                                            url:
                                                p.thumbnailUrl ??
                                                "/images/product-placeholder.png",
                                            alt: p.name,
                                        },
                                    ]
                            }
                        />
                        <div className="mt-12 hidden lg:block">
                            <ProductHighlights features={[]} />
                            <div className="mt-12">
                                <BenchmarkSection benchmarks={[]} />
                            </div>
                        </div>
                    </div>

                    {/* Right: Info & Actions */}
                    <div className="lg:col-span-5">
                        <ProductInfo
                            name={p.name}
                            brand={p.brandName}
                            rating={0}
                            reviewCount={0}
                        />
                        <div className="mt-4">
                            <ProductPrice
                                price={p.discountPrice ?? p.price}
                                originalPrice={p.discountPrice ?? 0}
                                stock={p.stockQuantity}
                            />
                        </div>
                        <div className="mt-8">
                            <ProductActions
                                id={p.id}
                                name={p.name}
                                price={p.discountPrice ?? p.price}
                                image={p.imageUrls?.[0] ?? ""}
                                brand={p.brandName}
                                stock={p.stockQuantity}
                            />
                        </div>
                        <div className="mt-8">
                            <CompatibilityChecker compatibility={[]} />
                        </div>
                        <div className="mt-8">
                            <BundleSuggestion
                                items={[]}
                                bundlePrice={0}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Highlights */}
                <div className="mt-12 lg:hidden">
                    <ProductHighlights features={[]} />
                    <div className="mt-12">
                        <BenchmarkSection benchmarks={[]} />
                    </div>
                </div>

                {/* Full Width Sections */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <ProductSpecs specifications={Array.isArray(p.specs) ? p.specs : []} />
                        <div className="mt-16">
                            <h2 className="headline-md mb-8">Customer Reviews</h2>
                            <ReviewSummary
                                rating={0}
                                reviewCount={0}
                                distribution={[0, 0, 0, 0, 0]}
                            />
                            <div className="mt-8">
                                <ReviewList reviews={[]} />
                            </div>
                        </div>
                        <div className="mt-16">
                            <QuestionAnswer questions={[]} />
                        </div>
                    </div>
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <RelatedProducts products={[]} />
                        </div>
                    </div>
                </div>
            </div>

            <StickyPurchaseBar
                name={p.name}
                price={p.discountPrice ?? p.price}
                image={p.imageUrls?.[0] ?? p.thumbnailUrl ?? "/images/product-placeholder.png"}
                stock={p.stockQuantity}
            />
        </div>
    );
}
