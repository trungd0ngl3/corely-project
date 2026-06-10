import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductSearch } from "@/components/products/ProductSearch";
import { ProductToolbar } from "@/components/products/ProductToolbar";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ActiveFilters } from "@/components/products/ActiveFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductPagination } from "@/components/products/ProductPagination";

export default function ProductsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb placeholder */}
                    <nav className="mb-6 text-sm text-on-surface-variant/60">
                        <span className="hover:text-primary-container cursor-pointer">Home</span>
                        <span className="mx-2">/</span>
                        <span className="text-on-surface font-medium">Products</span>
                    </nav>

                    <div className="flex flex-col gap-8">
                        {/* Search Bar */}
                        <div className="flex justify-center">
                            <ProductSearch />
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Sidebar Filters - Desktop */}
                            <aside className="hidden w-80 shrink-0 lg:block">
                                <ProductFilters />
                            </aside>

                            {/* Main Content */}
                            <div className="flex-1">
                                <ProductToolbar />
                                <ActiveFilters className="my-4" />
                                <ProductGrid />
                                <ProductPagination className="mt-12" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}