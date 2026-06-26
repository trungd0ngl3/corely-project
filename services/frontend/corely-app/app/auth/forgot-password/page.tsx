"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            // In a real app, you would have a forgot password endpoint
            // await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/auth/forgot-password`, {
            //   email: data.email,
            // });

            // Simulating API call for now since endpoint might not exist
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsSent(true);
            toast.success("Password reset link sent to your email!");
        } catch (error) {
            toast.error("Failed to send reset link. Please try again.");
            console.error("Forgot password error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg shadow-blue-100/50 max-w-md w-full mx-auto my-auto">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
                <p className="text-gray-500 mt-2">
                    {isSent
                        ? "Check your email for a reset link"
                        : "Enter your email to receive a password reset link"}
                </p>
            </div>

            {!isSent ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => onSubmit())} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </form>
                </Form>
            ) : (
                <div className="space-y-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsSent(false)}
                    >
                        Try another email
                    </Button>
                </div>
            )}

            <p className="mt-8 text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link href="/auth/login" className="font-semibold text-primary hover:text-blue-700">
                    Sign In
                </Link>
            </p>
        </div>
    );
}