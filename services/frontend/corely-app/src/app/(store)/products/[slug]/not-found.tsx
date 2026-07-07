import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export default function ProductNotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 rounded-full bg-error/10 p-6">
                <SearchX className="h-12 w-12 text-error" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-on-surface">Product Not Found</h1>
            <p className="mb-8 max-w-md text-on-surface-variant">
                We {"couldn't"} find the product {"you're"} looking for. It might have been removed, renamed, or temporarily unavailable.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/products"
                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary-container active:scale-[0.98]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Components
                </Link>
            </div>
        </div>
    );
}