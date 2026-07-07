import { CartList } from "@/components/cart/CartList";
import { CartSummary } from "@/components/cart/CartSummary";
import { RecommendedProducts } from "@/components/cart/RecommendedProducts";
import { CompatibilityAlert } from "@/components/cart/CompatibilityAlert";
import { BuildProgress } from "@/components/cart/BuildProgress";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CartPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground">Cart</span>
            </nav>

            <CompatibilityAlert />
            <BuildProgress />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Cart Items List - Takes up 70% roughly (8/12 cols) */}
                <div className="lg:col-span-8">
                    <CartList />
                </div>

                {/* Cart Summary - Takes up 30% roughly (4/12 cols) */}
                <div className="lg:col-span-4">
                    <CartSummary />
                </div>
            </div>

            <RecommendedProducts />
        </div>
    );
}