"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                Looks like you haven't added anything yet. Start exploring our high-performance PC components!
            </p>
            <Link href="/products">
                <Button size="lg" className="h-12 px-8">
                    Start Shopping
                </Button>
            </Link>
        </div>
    );
}