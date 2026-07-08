"use client";

import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useCartAnimation } from "@/hooks/use-cart-animation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function MiniCart() {
    const { items, removeItem, totalItems, totalPrice, fetchCart, serverCart } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const count = totalItems();

    useEffect(() => {
        setIsMounted(true);
        if (!serverCart) fetchCart();
    }, [fetchCart, serverCart]);

    const { animate } = useCartAnimation(count);
    const [open, setOpen] = useState(false);

    if (!isMounted) {
        return (
            <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 transition-all duration-200">
                    <ShoppingCart className="h-5 w-5" />
                    {count > 0 && (
                        <span
                            className={cn(
                                "absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-flash text-[10px] font-bold text-white transition-transform duration-300",
                                animate ? "scale-125" : "scale-100"
                            )}
                        >
                            {count}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col bg-white/70 backdrop-blur-sm">
                <SheetHeader>
                    <SheetTitle>Shopping Cart ({count})</SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 space-y-4">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground opacity-50" />
                        <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                        <Button onClick={() => setOpen(false)} asChild>
                            <Link href="/products">Start Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-4">
                                    <div className="relative w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                                        <Image
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                                            <div className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t space-y-4 mt-auto">
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Subtotal</span>
                                <span>{formatCurrency(totalPrice())}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" asChild onClick={() => setOpen(false)}>
                                    <Link href="/cart">View Cart</Link>
                                </Button>
                                <Button asChild onClick={() => setOpen(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Link href="/checkout">Checkout</Link>
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}