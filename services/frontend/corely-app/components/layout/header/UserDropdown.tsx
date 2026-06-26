"use client";

import Link from "next/link";
import Image from "next/image";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/use-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserDropdown() {
    const { user, isAuthenticated, isHydrated, logout } = useAuthStore();

    if (!isHydrated) {
        return (
            <Button variant="ghost" size="icon" className="relative hidden sm:flex pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-outline-variant/50 animate-pulse" />
            </Button>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <Link href="/auth/login" className="hidden sm:flex">
                <Button variant="ghost" size="icon" className="hover:bg-primary/5 transition-all duration-200">
                    <User className="h-5 w-5" />
                </Button>
            </Link>
        );
    }

    const isAdmin = user.role === "ADMIN";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hidden sm:flex hover:bg-primary/5 transition-all duration-200">
                    {user.avatar ? (
                        <Image
                            src={user.avatar}
                            alt={user.fullName}
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
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
                {isAdmin && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/admin" className="cursor-pointer font-medium text-primary-container">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
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
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}