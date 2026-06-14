"use client";

import { useCart } from "@/store/use-cart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function CartSummary() {
    const { totalPrice, items } = useCart();
    const subtotal = totalPrice();

    // Simulate some logic
    const discount = subtotal > 20000000 ? 2000000 : 0;
    const shipping = 0;
    const vat = subtotal * 0.1;
    const total = subtotal - discount + shipping + vat;

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

            <div className="mb-6 space-y-2">
                <p className="text-sm font-medium">Discount Code</p>
                <div className="flex space-x-2">
                    <Input placeholder="CORELY10" />
                    <Button variant="secondary">Apply</Button>
                </div>
            </div>

            <Button className="w-full h-12 text-base font-semibold bg-[#2563EB] hover:bg-blue-700 text-white">
                Proceed To Checkout
            </Button>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center"><span className="text-green-500 mr-2">✓</span> Free Shipping</p>
                <p className="flex items-center"><span className="text-green-500 mr-2">✓</span> Secure Payment</p>
                <p className="flex items-center"><span className="text-green-500 mr-2">✓</span> Genuine Products</p>
                <p className="flex items-center"><span className="text-green-500 mr-2">✓</span> 7-Day Return Policy</p>
            </div>
        </div>
    );
}