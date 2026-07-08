import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
    return (
        <div className={cn("relative w-full max-w-2xl", className)}>
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant/50" />
            <input
                type="text"
                placeholder="Search components, laptops, gaming gear..."
                className="h-12 w-full rounded-full border border-outline-variant bg-surface-container-lowest pl-12 pr-6 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/5 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary-container px-5 py-2 text-xs font-bold text-white hover:bg-primary transition-colors">
                Search
            </button>
        </div>
    );
}