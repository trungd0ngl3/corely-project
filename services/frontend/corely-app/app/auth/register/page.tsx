"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Check } from "lucide-react";
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
import { toast } from "sonner";
import axios from "axios";

const registerSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number is required" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        hasLength: false,
        hasUpper: false,
        hasNumber: false,
        hasSpecial: false,
    });

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            dob: "",
            password: "",
            confirmPassword: "",
            agreeTerms: false,
        },
    });

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

    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/auth/register`, {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                dob: data.dob,
                password: data.password,
            });

            toast.success("Registration successful! Please check your email to verify your account.");
            router.push("/auth/verify-email");
        } catch (error) {
            toast.error("Registration failed. Please try again.");
            console.error("Registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const registerWithGoogle = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/oauth2/authorization/google`;
    };

    const registerWithFacebook = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/oauth2/authorization/facebook`;
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg shadow-blue-100/50 my-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-500 mt-2">Join Corely today</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your full name" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone number" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Create a password"
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
                                    <Input type="password" placeholder="Confirm your password" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="agreeTerms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm text-gray-700 cursor-pointer font-normal">
                                        I agree to Terms & Conditions
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>
            </Form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">OR</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                    <Button variant="outline" type="button" onClick={registerWithGoogle} disabled={isLoading}>
                        <FcGoogle className="mr-2 h-5 w-5" />
                        Sign up with Google
                    </Button>
                    <Button variant="outline" type="button" onClick={registerWithFacebook} disabled={isLoading}>
                        <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
                        Sign up with Facebook
                    </Button>
                </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-semibold text-primary hover:text-blue-700">
                    Sign In
                </Link>
            </p>
        </div>
    );
}