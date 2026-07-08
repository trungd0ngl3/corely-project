"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/hooks/use-auth";
import { UserService } from "@/services/user.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function OAuthRedirectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, updateUser } = useAuthStore();

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token?.trim()) {
            toast.error("Authentication failed");
            router.replace("/auth/login");
            return;
        }

        const authenticate = async () => {
            try {
                const refreshToken = searchParams.get("refreshToken") || "";

                login(null, token, refreshToken);

                const response = await UserService.getMyInfo();

                updateUser(response.result);

                toast.success("Welcome back!");
                router.replace("/");
            } catch (error) {
                console.error(error);
                toast.error("Failed to authenticate");
                router.replace("/auth/login");
            }
        };

        authenticate();
    }, [searchParams, router, login]);

    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}