"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/use-auth";
import { UserService } from "@/services/user.service";
import { AuthService } from "@/services/auth.service";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApiResponse } from "@/types/api";
import { UserResponse } from "@/types/user";

export function UserDropdown() {
    const { user, isAuthenticated, isHydrated, logout, updateUser, refreshToken } = useAuthStore();

    const handleLogout = async () => {
        if (refreshToken) {
            try {
                await AuthService.logout({ token: refreshToken });
            } catch (err) {
                console.error("Logout error:", err);
            }
        }
        logout();
    };

    useEffect(() => {
        console.log("UserDropdown effect:", { isHydrated, isAuthenticated, user });
        if (isHydrated && isAuthenticated && !user) {
            UserService.getMyInfo().then((res: ApiResponse<UserResponse>) => {
                console.log("User fetch result:", res);
                if (res) updateUser(res);
            }).catch((err) => {
                console.error("User fetch error:", err);
                logout();
            });
        }
    }, [isHydrated, isAuthenticated, user, updateUser, logout]);

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

    const isAdmin = user.roles.includes("ADMIN");
    const isSeller = user.roles.includes("SELLER");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 transition-all duration-200">
                    {user.avatarUrl ? (
                        <Image
                            src={user.avatarUrl}
                            alt={user.fullName}
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                            {user.fullName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.fullName}</p>
                        <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                {(isAdmin || isSeller) && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={isAdmin ? "/admin/dashboard" : "/seller"} className="cursor-pointer font-medium">
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
                    <Link href="/wishlist" className="cursor-pointer">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}