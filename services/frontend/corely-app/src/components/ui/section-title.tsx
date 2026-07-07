import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    href?: string;
    linkText?: string;
    className?: string;
    accent?: boolean;
}

export function SectionTitle({
    title,
    subtitle,
    href,
    linkText = "View All",
    className,
    accent = false,
}: SectionTitleProps) {
    return (
        <div className={cn("mb-8 flex items-end justify-between", className)}>
            <div>
                {subtitle && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-container">
                        {subtitle}
                    </span>
                )}
                <h2 className={cn(
                    "mt-1 text-headline-md font-bold uppercase tracking-tight",
                    accent ? "text-orange" : "text-on-surface"
                )}>
                    {title}
                </h2>
            </div>
            {href && (
                <Link
                    href={href}
                    className="flex items-center gap-1 text-sm font-bold text-primary-container hover:underline"
                >
                    {linkText} <ArrowRight className="h-4 w-4" />
                </Link>
            )}
        </div>
    );
}