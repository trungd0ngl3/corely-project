"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/lib/api";

export default function CheckoutPage() {
    const { items, finalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        setLoading(true);
        setError("");
        try {
            // Đơn giản: gửi danh sách sản phẩm, tổng tiền lên backend
            const orderItems = items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));
            await createOrder({
                items: orderItems,
                total: finalPrice(),
            });
            setSuccess(true);
            clearCart();
            setTimeout(() => router.push("/"), 2000);
        } catch (e: any) {
            setError(e.message || "Checkout failed");
        } finally {
            setLoading(false);
        }
    };

    if (success)
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-card rounded shadow text-center">
                <h2 className="text-2xl font-bold mb-4">Order placed successfully!</h2>
                <p>You will be redirected to home page.</p>
            </div>
        );

    if (items.length === 0)
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-card rounded shadow text-center">
                <h2 className="text-xl font-bold mb-4">Your cart is empty.</h2>
            </div>
        );

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-card rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            <Separator className="mb-6" />
            <ul className="mb-6">
                {items.map((item) => (
                    <li key={item.id} className="flex justify-between mb-2">
                        <span>
                            {item.name} x {item.quantity}
                        </span>
                        <span>
                            {item.price.toLocaleString()}₫
                        </span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>{finalPrice().toLocaleString()}₫</span>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <Button
                className="w-full h-12 text-base font-semibold bg-[#2563EB] hover:bg-blue-700 text-white"
                onClick={handleCheckout}
                disabled={loading}
            >
                {loading ? "Processing..." : "Place Order"}
            </Button>
        </div>
    );
}