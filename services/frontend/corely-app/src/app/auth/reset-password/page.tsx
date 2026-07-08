"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import axios from "axios";

const resetPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        hasLength: false,
        hasUpper: false,
        hasNumber: false,
        hasSpecial: false,
    });

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        if (!token) {
            toast.error("Invalid or missing reset token");
            router.push("/auth/login");
        }
    }, [token, router]);

    const checkPasswordStrength = (password: string) => {
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        let score = 0;
        if (hasLength) score++;
        if (hasUpper) score++;
        if (hasNumber) score++;
        if (hasSpecial) score++;

        setPasswordStrength({
            score,
            hasLength,
            hasUpper,
            hasNumber,
            hasSpecial,
        });
    };

    const getStrengthText = () => {
        if (passwordStrength.score === 0) return "";
        if (passwordStrength.score <= 2) return "Weak";
        if (passwordStrength.score === 3) return "Medium";
        return "Strong";
    };

    const getStrengthColor = () => {
        if (passwordStrength.score <= 2) return "bg-red-500";
        if (passwordStrength.score === 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const onSubmit = async (data: ResetPasswordValues) => {
        if (!token) return;

        setIsLoading(true);
        try {
            // In a real app, you would have a reset password endpoint
            // await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/auth/reset-password`, {
            //   token,
            //   newPassword: data.password,
            // });

            // Simulating API call for now
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsSuccess(true);
            toast.success("Password reset successful!");
        } catch (error) {
            toast.error("Failed to reset password. The link might have expired.");
            console.error("Reset password error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg shadow-blue-100/50 max-w-md w-full mx-auto my-auto">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    {isSuccess ? "Password Reset Complete" : "Create New Password"}
                </h2>
                <p className="text-gray-500 mt-2">
                    {isSuccess
                        ? "Your password has been updated successfully"
                        : "Please enter your new password below"}
                </p>
            </div>

            {!isSuccess ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                checkPasswordStrength(e.target.value);
                                            }}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    {field.value && (
                                        <div className="mt-2 space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-medium text-gray-500">Password Strength</span>
                                                <span className={`font-semibold ${passwordStrength.score <= 2 ? 'text-red-500' :
                                                        passwordStrength.score === 3 ? 'text-yellow-500' : 'text-green-500'
                                                    }`}>
                                                    {getStrengthText()}
                                                </span>
                                            </div>
                                            <div className="flex gap-1 h-1">
                                                <div className={`flex-1 rounded-full ${passwordStrength.score >= 1 ? getStrengthColor() : 'bg-gray-200'}`} />
                                                <div className={`flex-1 rounded-full ${passwordStrength.score >= 2 ? getStrengthColor() : 'bg-gray-200'}`} />
                                                <div className={`flex-1 rounded-full ${passwordStrength.score >= 3 ? getStrengthColor() : 'bg-gray-200'}`} />
                                                <div className={`flex-1 rounded-full ${passwordStrength.score >= 4 ? getStrengthColor() : 'bg-gray-200'}`} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mt-2">
                                                <div className="flex items-center gap-1">
                                                    <Check className={`w-3 h-3 ${passwordStrength.hasLength ? 'text-green-500' : 'text-gray-300'}`} />
                                                    8 characters
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Check className={`w-3 h-3 ${passwordStrength.hasUpper ? 'text-green-500' : 'text-gray-300'}`} />
                                                    Uppercase
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Check className={`w-3 h-3 ${passwordStrength.hasNumber ? 'text-green-500' : 'text-gray-300'}`} />
                                                    Number
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Check className={`w-3 h-3 ${passwordStrength.hasSpecial ? 'text-green-500' : 'text-gray-300'}`} />
                                                    Special character
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm your new password" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Resetting Password..." : "Reset Password"}
                        </Button>
                    </form>
                </Form>
            ) : (
                <div className="space-y-4">
                    <Button className="w-full" asChild>
                        <Link href="/auth/login">
                            Continue to Login
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-blue-100/50 max-w-md w-full mx-auto my-auto flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}