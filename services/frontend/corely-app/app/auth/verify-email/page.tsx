"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [isVerifying, setIsVerifying] = useState(!!token);
    const [isVerified, setIsVerified] = useState(false);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) return;

            try {
                // In a real app, you would have a verify email endpoint
                // await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/auth/verify-email`, { token });

                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                setIsVerified(true);
                toast.success("Email verified successfully!");
            } catch (error) {
                toast.error("Failed to verify email. The link might have expired.");
                console.error("Verify email error:", error);
            } finally {
                setIsVerifying(false);
            }
        };

        verifyToken();
    }, [token]);

    const handleResend = async () => {
        if (!email) {
            toast.error("Email address not found");
            return;
        }

        setIsResending(true);
        try {
            // In a real app, you would have a resend verification email endpoint
            // await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/auth/resend-verification`, { email });

            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Verification email sent! Please check your inbox.");
        } catch (error) {
            toast.error("Failed to resend email. Please try again.");
            console.error("Resend email error:", error);
        } finally {
            setIsResending(false);
        }
    };

    // State 1: Verifying token from URL
    if (isVerifying) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-blue-100/50 max-w-md w-full mx-auto my-auto text-center">
                <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
                <p className="text-gray-500">Please wait while we verify your email address...</p>
            </div>
        );
    }

    // State 2: Successfully verified
    if (isVerified) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-blue-100/50 max-w-md w-full mx-auto my-auto text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                <p className="text-gray-500 mb-8">
                    Thank you for verifying your email. Your account is now fully active.
                </p>
                <Button className="w-full" asChild>
                    <Link href="/auth/login">Continue to Login</Link>
                </Button>
            </div>
        );
    }

    // State 3: Show instruction to check email (default view after registration)
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg shadow-blue-100/50 max-w-md w-full mx-auto my-auto text-center">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Email Sent</h2>
            <p className="text-gray-500 mb-2">
                Please check your inbox to verify your account
            </p>
            {email && (
                <p className="font-medium text-gray-900 mb-8">{email}</p>
            )}

            <div className="space-y-4">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleResend}
                    disabled={isResending}
                >
                    {isResending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Resend Email"
                    )}
                </Button>
                <p className="text-sm text-gray-500">
                    {"Didn't"} receive it? Check your spam folder or try resending.
                </p>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-blue-100/50 max-w-md w-full mx-auto my-auto flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}