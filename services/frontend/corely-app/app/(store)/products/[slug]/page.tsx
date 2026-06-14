import { MOCK_PRODUCT } from "@/lib/mock-product-detail";
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

export default function ProductDetailPage() {
    const product = MOCK_PRODUCT;

    return (
        <div className="bg-surface min-h-screen pb-20">
            <div className="container-max py-8">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm text-on-surface-variant/60">
                    <span className="hover:text-primary-container cursor-pointer">Home</span>
                    <span className="mx-2">/</span>
                    <span className="hover:text-primary-container cursor-pointer">Products</span>
                    <span className="mx-2">/</span>
                    <span className="text-on-surface font-medium">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Gallery */}
                    <div className="lg:col-span-7">
                        <ProductGallery images={product.images} />
                        <div className="mt-12 hidden lg:block">
                            <ProductHighlights features={product.features} />
                            <div className="mt-12">
                                <BenchmarkSection benchmarks={product.benchmarks} />
                            </div>
                        </div>
                    </div>

                    {/* Right: Info & Actions */}
                    <div className="lg:col-span-5">
                        <ProductInfo
                            name={product.name}
                            brand={product.brand}
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                        />
                        <div className="mt-4">
                            <ProductPrice
                                price={product.price}
                                originalPrice={product.originalPrice}
                                stock={product.stock}
                            />
                        </div>
                        <div className="mt-8">
                            <ProductActions
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.images[0]?.url || ""}
                                brand={product.brand}
                                stock={product.stock}
                            />
                        </div>
                        <div className="mt-8">
                            <CompatibilityChecker compatibility={product.compatibility} />
                        </div>
                        <div className="mt-8">
                            <BundleSuggestion
                                items={product.bundle.items}
                                bundlePrice={product.bundle.bundlePrice}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Highlights */}
                <div className="mt-12 lg:hidden">
                    <ProductHighlights features={product.features} />
                    <div className="mt-12">
                        <BenchmarkSection benchmarks={product.benchmarks} />
                    </div>
                </div>

                {/* Full Width Sections */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <ProductSpecs specifications={product.specifications} />
                        <div className="mt-16">
                            <h2 className="headline-md mb-8">Customer Reviews</h2>
                            <ReviewSummary
                                rating={product.rating}
                                count={product.reviewCount}
                                distribution={product.ratingDistribution}
                            />
                            <div className="mt-8">
                                <ReviewList reviews={product.reviews} />
                            </div>
                        </div>
                        <div className="mt-16">
                            <QuestionAnswer questions={product.questions} />
                        </div>
                    </div>
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <RelatedProducts products={product.relatedProducts} />
                        </div>
                    </div>
                </div>
            </div>

            <StickyPurchaseBar
                name={product.name}
                price={product.price}
                imageUrl={product.images[0]?.url || ""}
                stock={product.stock}
            />
        </div>
    );
}
