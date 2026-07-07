import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Left side - Image/Banner (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-primary relative overflow-hidden">
                {/* Placeholder for real setup image */}
                <div className="absolute inset-0 bg-blue-900/20 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1603481546238-48724041592d?q=80&w=2070&auto=format&fit=crop"
                    alt="Gaming Setup"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="relative z-20 text-white p-12 w-full max-w-2xl">
                    <Link href="/" className="text-4xl font-bold tracking-tight inline-block mb-12">
                        CORELY
                    </Link>
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        High-Performance <br />
                        <span className="text-blue-300">Precision.</span>
                    </h1>
                    <p className="text-lg text-blue-100 max-w-md">
                        Build your ultimate machine. Discover premium PC components for gaming and professional workloads.
                    </p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <Link href="/" className="lg:hidden text-3xl font-bold tracking-tight text-primary block mb-8 text-center">
                        CORELY
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    );
}