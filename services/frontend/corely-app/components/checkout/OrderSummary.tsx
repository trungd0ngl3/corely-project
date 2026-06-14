"use client";

import { useCart } from "@/store/use-cart";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function OrderSummary() {
    const { items, totalPrice } = useCart();

    // Derived values for summary
    const subtotal = totalPrice();
    const shipping = 0; // Assuming standard delivery is free
    const discount = -1000000; // Mock discount for CORELY10 coupon
    const vat = subtotal * 0.1; // 10% VAT
    const total = subtotal + shipping + discount + vat;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            {/* Product List */}
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 relative flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                <span className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/cart" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back To Cart
            </Link>

            {/* Coupon Section */}
            <div className="flex space-x-2 mb-6">
                <Input placeholder="Coupon Code" defaultValue="CORELY10" className="flex-1" />
                <Button variant="secondary">Apply</Button>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-medium text-green-600">{formatCurrency(discount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">VAT</span>
                    <span className="font-medium">{formatCurrency(vat)}</span>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                <span className="text-base font-semibold">Total</span>
                <span className="text-xl font-bold text-red-600">{formatCurrency(total)}</span>
            </div>
        </div>
    );
}