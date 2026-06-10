import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MOCK_PRODUCT } from "@/lib/mock-product-detail";
import { ProductGallery } from "@/components/product-detail/ProductGallery";
import { ProductInfo } from "@/components/product-detail/ProductInfo";
import { ProductPrice } from "@/components/product-detail/ProductPrice";
import { ProductActions } from "@/components/product-detail/ProductActions";
import { ProductHighlights } from "@/components/product-detail/ProductHighlights";
import { ProductSpecs } from "@/components/product-detail/ProductSpecs";
import { BenchmarkSection } from "@/components/product-detail/BenchmarkSection";
import { CompatibilityChecker } from "@/components/product-detail/CompatibilityChecker";
import { ReviewSummary } from "@/components/product-detail/ReviewSummary";
import { ReviewList } from "@/components/product-detail/ReviewList";
import { QuestionAnswer } from "@/components/product-detail/QuestionAnswer";
import { RelatedProducts } from "@/components/product-detail/RelatedProducts";
import { BundleSuggestion } from "@/components/product-detail/BundleSuggestion";
import { StickyPurchaseBar } from "@/components/product-detail/StickyPurchaseBar";

export default function ProductDetailPage() {
    const product = MOCK_PRODUCT;

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/products" },
        { label: "GPU", href: "/products?category=gpu" },
        { label: product.name, href: null },
    ];

    return (
        <div className="min-h-screen bg-surface pb-24">
            <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-1 text-sm text-on-surface-variant/60">
                    {breadcrumbs.map((crumb, i) => (
                        <span key={i} className="flex items-center gap-1">
                            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                            {crumb.href ? (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-primary transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-on-surface font-medium line-clamp-1">
                                    {crumb.label}
                                </span>
                            )}
                        </span>
                    ))}
                </nav>

                {/* Hero Section: Gallery + Info */}
                <div className="grid gap-8 lg:grid-cols-2">
                    <ProductGallery images={product.images} />
                    <div className="flex flex-col gap-6">
                        <ProductInfo
                            brand={product.brand}
                            name={product.name}
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                        />
                        <ProductPrice
                            price={product.price}
                            originalPrice={product.originalPrice}
                            stock={product.stock}
                        />
                        <ProductActions
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0]?.url || ""}
                            brand={product.brand}
                            stock={product.stock}
                        />
                    </div>
                </div>

                {/* Content Sections */}
                <div className="mt-12 space-y-12">
                    <ProductHighlights features={product.features} />
                    <ProductSpecs specifications={product.specifications} />
                    <BenchmarkSection benchmarks={product.benchmarks} />
                    <CompatibilityChecker compatibility={product.compatibility} />
                    <ReviewSummary
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        distribution={product.ratingDistribution}
                    />
                    <ReviewList reviews={product.reviews} />
                    <QuestionAnswer questions={product.questions} />
                    <BundleSuggestion
                        items={product.bundle.items}
                        bundlePrice={product.bundle.bundlePrice}
                    />
                    <RelatedProducts products={product.relatedProducts} />
                </div>
            </div>

            <StickyPurchaseBar
                name={product.name}
                price={product.price}
                stock={product.stock}
            />
        </div>
    );
}