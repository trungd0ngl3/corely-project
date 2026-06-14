import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
    return (
        <div className="bg-surface min-h-[80vh] flex items-center justify-center py-12">
            <div className="container-max max-w-2xl text-center">
                <div className="mb-8 flex justify-center">
                    <div className="rounded-full bg-success/10 p-4">
                        <CheckCircle2 className="h-16 w-16 text-success" />
                    </div>
                </div>

                <h1 className="headline-lg mb-4 text-on-surface">Order Placed Successfully!</h1>
                <p className="body-lg mb-8 text-on-surface-variant">
                    Thank you for your purchase. Your order <span className="font-bold text-on-surface">#CR-82931</span> has been received and is being processed.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 text-left">
                        <Package className="h-6 w-6 text-primary mb-3" />
                        <h3 className="font-bold text-on-surface mb-1">Shipping Updates</h3>
                        <p className="text-sm text-on-surface-variant">
                            We'll send you an email with tracking information once your items ship.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 text-left">
                        <ShoppingBag className="h-6 w-6 text-primary mb-3" />
                        <h3 className="font-bold text-on-surface mb-1">Manage Order</h3>
                        <p className="text-sm text-on-surface-variant">
                            You can track your order status and view details in your account.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/orders"
                        className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-container active:scale-[0.98]"
                    >
                        View Order History
                    </Link>
                    <Link
                        href="/products"
                        className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-outline-variant px-8 py-3.5 text-sm font-bold text-on-surface transition-all hover:bg-surface-container-low active:scale-[0.98]"
                    >
                        Continue Shopping
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}