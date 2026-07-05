"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/store/use-auth";
import { toast } from "sonner";
import axios from "axios";
import { loginApi, getMeApi } from "@/services/auth.service";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            const response = await loginApi(data.email, data.password, data.rememberMe);
            if (response.data.code !== 1000) {
                toast.error(response.data.message || "Login failed");
                return;
            }

            const { token } = response.data.result;
            const me = await getMeApi(token);
            login(me.data, token);
            toast.success("Welcome back!");
            router.replace("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Something went wrong");
            } else {
                toast.error("Unexpected error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = () => {
        window.location.assign(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/oauth2/authorization/google`);
    };

    const loginWithFacebook = () => {
        window.location.assign(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/oauth2/authorization/facebook`);
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg shadow-blue-100/50">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-500 mt-2">Sign in to continue</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2.5 text-gray-500"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-between">
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                                            Remember me
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Link
                            href="/auth/forgot-password"
                            className="text-sm font-medium text-primary hover:text-blue-700"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>
                </form>
            </Form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">OR</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                    <Button variant="outline" type="button" onClick={loginWithGoogle} disabled={isLoading}>
                        <FcGoogle className="mr-2 h-5 w-5" />
                        Continue with Google
                    </Button>
                    <Button variant="outline" type="button" onClick={loginWithFacebook} disabled={isLoading}>
                        <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
                        Continue with Facebook
                    </Button>
                </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
                {"Don't"} have an account?{" "}
                <Link href="/auth/register" className="font-semibold text-primary hover:text-blue-700">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}