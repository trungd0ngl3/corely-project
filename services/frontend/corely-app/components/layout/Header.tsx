"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Heart, Bell } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/use-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface/80 backdrop-blur-md">
            <div className="container-max flex h-16 items-center justify-between gap-4">
                <Link href="/">
                    <Logo className="scale-90 origin-left" />
                </Link>

                <div className="hidden flex-1 items-center justify-center md:flex">
                    <div className="relative w-full max-w-xl">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
                        <input
                            type="text"
                            placeholder="Search components, pre-builts..."
                            className="h-10 w-full rounded-full border border-outline-variant bg-surface-container-lowest pl-10 pr-4 text-sm outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/10 transition-all"
                        />
                    </div>
                </div>

                <nav className="flex items-center gap-1 sm:gap-2">
                    <Link href="/products">
                        <Button variant="ghost" className="hidden sm:flex hover:text-primary-container font-medium text-sm">
                            Products
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-flash text-[10px] font-bold text-white">
                                3
                            </span>
                        </Button>
                    </Link>
                    {mounted && isAuthenticated && user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.fullName}
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-5 w-5" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        <p className="font-medium">{user.fullName}</p>
                                        <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/orders" className="cursor-pointer">Orders</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/wishlist" className="cursor-pointer">Wishlist</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/pc-builder" className="cursor-pointer">PC Builder</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/addresses" className="cursor-pointer">Addresses</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-600 focus:text-red-600">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/auth/login">
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                    )}
                </nav>
            </div>
            <div className="border-t border-outline-variant/50 bg-surface-container-lowest/50">
                <div className="container-max flex h-10 items-center gap-8 overflow-x-auto scrollbar-hide text-sm font-medium text-on-surface-variant">
                    <Link href="/products?category=cpu" className="hover:text-primary-container transition-colors whitespace-nowrap">CPU</Link>
                    <Link href="/products?category=ram" className="hover:text-primary-container transition-colors whitespace-nowrap">RAM</Link>
                    <Link href="/products?category=ssd" className="hover:text-primary-container transition-colors whitespace-nowrap">SSD</Link>
                    <Link href="/products?category=gpu" className="hover:text-primary-container transition-colors whitespace-nowrap">GPU</Link>
                    <Link href="/products?category=mainboard" className="hover:text-primary-container transition-colors whitespace-nowrap">Mainboard</Link>
                    <Link href="/products?category=laptop" className="hover:text-primary-container transition-colors whitespace-nowrap">Laptop</Link>
                    <Link href="/products?category=monitor" className="hover:text-primary-container transition-colors whitespace-nowrap">Monitor</Link>
                    <Link href="/products?category=accessory" className="hover:text-primary-container transition-colors whitespace-nowrap">Accessory</Link>
                </div>
            </div>
        </header>
    );
}