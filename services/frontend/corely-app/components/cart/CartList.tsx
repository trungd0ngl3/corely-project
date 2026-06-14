"use client";

import { useCart } from "@/store/use-cart";
import { CartItem } from "./CartItem";
import { EmptyCart } from "./EmptyCart";
import { Button } from "@/components/ui/button";

export function CartList() {
    const { items, clearCart } = useCart();

    if (items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
                <Button variant="ghost" className="text-destructive" onClick={clearCart}>
                    Clear Cart
                </Button>
            </div>

            <div className="text-muted-foreground mb-4">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </div>

            <div className="bg-card border rounded-lg p-6">
                <div className="flex flex-col gap-0 divide-y">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}