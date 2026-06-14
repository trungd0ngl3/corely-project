"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Heart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./QuantitySelector";
import { useCart, CartItem as ICartItem } from "@/store/use-cart";
import { Badge } from "@/components/ui/badge";

interface CartItemProps {
    item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();

    const inStock = (item.stock ?? 10) > 0;
    const stockStatus = inStock ? (item.stock && item.stock < 5 ? `Only ${item.stock} left` : "In Stock") : "Out of stock";

    return (
        <div className="flex flex-col sm:flex-row gap-4 py-6 border-b">
            <div className="shrink-0 rounded-md overflow-hidden bg-muted w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 96px, 128px"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <Link href={`/product/${item.productId}`} className="font-medium text-lg hover:underline line-clamp-2">
                            {item.name}
                        </Link>
                        {item.brand && <p className="text-sm text-muted-foreground mt-1">Brand: {item.brand}</p>}
                        {item.sku && <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>}

                        <div className="mt-2">
                            <Badge variant={inStock ? "secondary" : "destructive"} className="text-xs">
                                {stockStatus}
                            </Badge>
                        </div>
                    </div>
                    <div className="text-right font-semibold text-lg whitespace-nowrap ml-4">
                        {formatCurrency(item.price)}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <QuantitySelector
                            quantity={item.quantity}
                            maxQuantity={item.stock}
                            onUpdate={(qty) => updateQuantity(item.id, qty)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <Heart className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Save For Later</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Remove</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}