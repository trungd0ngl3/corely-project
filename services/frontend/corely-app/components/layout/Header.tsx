import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Bell } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface/80 backdrop-blur-md">
            <div className="container-max flex h-16 items-center justify-between gap-4">
                <Link href="/">
                    <Logo className="scale-90 origin-left" />
                </Link>

                <div className="hidden flex-1 items-center justify-center md:flex">
                    <div className="relative w-full max-w-xl">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
                        <input
                            type="text"
                            placeholder="Search components, pre-builts..."
                            className="h-10 w-full rounded-full border border-outline-variant bg-surface-container-lowest pl-10 pr-4 text-sm outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/10 transition-all"
                        />
                    </div>
                </div>

                <nav className="flex items-center gap-1 sm:gap-2">
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-flash text-[10px] font-bold text-white">
                                3
                            </span>
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>
                </nav>
            </div>
            <div className="border-t border-outline-variant/50 bg-surface-container-lowest/50">
                <div className="container-max flex h-10 items-center gap-8 overflow-x-auto scrollbar-hide text-sm font-medium text-on-surface-variant">
                    <Link href="/category/cpu" className="hover:text-primary-container transition-colors whitespace-nowrap">CPU</Link>
                    <Link href="/category/ram" className="hover:text-primary-container transition-colors whitespace-nowrap">RAM</Link>
                    <Link href="/category/ssd" className="hover:text-primary-container transition-colors whitespace-nowrap">SSD</Link>
                    <Link href="/category/gpu" className="hover:text-primary-container transition-colors whitespace-nowrap">GPU</Link>
                    <Link href="/category/mainboard" className="hover:text-primary-container transition-colors whitespace-nowrap">Mainboard</Link>
                    <Link href="/category/laptop" className="hover:text-primary-container transition-colors whitespace-nowrap">Laptop</Link>
                    <Link href="/category/monitor" className="hover:text-primary-container transition-colors whitespace-nowrap">Monitor</Link>
                    <Link href="/category/accessory" className="hover:text-primary-container transition-colors whitespace-nowrap">Accessory</Link>
                </div>
            </div>
        </header>
    );
}
