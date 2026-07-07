import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
    return (
        <footer className="w-full border-t border-outline-variant bg-surface-container-low py-12">
            <div className="container-max">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Logo className="scale-90 origin-left" />
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                            Engineered for high-performance computing. Precise, powerful, and dependable hardware for professionals and enthusiasts.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-on-surface">Products</h3>
                        <ul className="flex flex-col gap-2 text-sm text-on-surface-variant">
                            <li><Link href="/category/cpu" className="hover:text-primary-container transition-colors">Processors (CPU)</Link></li>
                            <li><Link href="/category/gpu" className="hover:text-primary-container transition-colors">Graphics Cards (GPU)</Link></li>
                            <li><Link href="/category/laptop" className="hover:text-primary-container transition-colors">Gaming Laptops</Link></li>
                            <li><Link href="/pre-builts" className="hover:text-primary-container transition-colors">Pre-built PCs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-on-surface">Support</h3>
                        <ul className="flex flex-col gap-2 text-sm text-on-surface-variant">
                            <li><Link href="/help" className="hover:text-primary-container transition-colors">Help Center</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary-container transition-colors">Shipping Info</Link></li>
                            <li><Link href="/returns" className="hover:text-primary-container transition-colors">Returns & Warranty</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-container transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-on-surface">Legal</h3>
                        <ul className="flex flex-col gap-2 text-sm text-on-surface-variant">
                            <li><Link href="/terms" className="hover:text-primary-container transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary-container transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/cookies" className="hover:text-primary-container transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-outline-variant/50 pt-8 text-center text-xs text-on-surface-variant">
                    <p>© {new Date().getFullYear()} Corely High-Performance Computing. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
