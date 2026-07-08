"use client";

import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { CouponForm } from "./CouponForm";

export function CartSummary() {
    const { totalPrice, items } = useCart();
    const subtotal = totalPrice();

    const { discount: getDiscount, finalPrice, serverCart } = useCart();

    // Server values or fallbacks
    const discount = getDiscount();
    const total = finalPrice();
    const shipping = 0; // Assume free shipping for now or fetch from server
    const vat = 0; // If VAT is included in server total, or adjust as needed

    if (items.length === 0) return null;

    return (
        <div className="bg-card border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-medium text-destructive">-{formatCurrency(discount)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT</span>
                    <span className="font-medium">{formatCurrency(vat)}</span>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-base font-semibold mb-6">
                <span>Total</span>
                <span className="text-primary text-xl">{formatCurrency(total)}</span>
            </div>

            <CouponForm />

            <Link href="/checkout" className="w-full">
                <Button className="w-full h-12 text-base font-semibold bg-[#2563EB] hover:bg-blue-700 text-white">
                    Proceed To Checkout
                </Button>
            </Link>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center"><span className="text-green-500 mr-2">✓</span> Free Shipping</p>
                <p className="flex items-center"><span className="text-green-500 mr-2">✓</span> Secure Payment</p>
                <p className="flex items-center"><span className="text-green-500 mr-2">✓</span> Genuine Products</p>
                <p className="flex items-center"><span className="text-green-500 mr-2">✓</span> 7-Day Return Policy</p>
            </div>
        </div>
    );
}