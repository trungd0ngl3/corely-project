"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/use-categories";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/ui/logo";

export function MobileMenu() {
    const [open, setOpen] = useState(false);
    const { data: categories } = useCategories();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
                <SheetHeader className="p-4 border-b border-outline-variant text-left">
                    <SheetTitle>
                        <Logo className="scale-75 origin-left" />
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col py-2">
                        <Link
                            href="/products"
                            className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-surface-container-lowest transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            All Products
                        </Link>
                        <Link
                            href="/deals"
                            className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-surface-container-lowest transition-colors text-error"
                            onClick={() => setOpen(false)}
                        >
                            Hot Deals
                        </Link>

                        <div className="px-4 py-2 mt-4">
                            <h4 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                                Categories
                            </h4>
                        </div>

                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.slug}`}
                                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-surface-container-lowest transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                {category.name}
                                <ChevronRight className="h-4 w-4 text-on-surface-variant" />
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t border-outline-variant bg-surface-container-lowest">
                    <Link
                        href="/support"
                        className="text-sm font-medium hover:text-primary transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Customer Support
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}