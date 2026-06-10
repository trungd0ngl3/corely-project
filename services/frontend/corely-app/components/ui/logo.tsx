import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2 font-bold text-2xl tracking-tight text-on-surface", className)}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container shadow-level-1">
                <div className="flex flex-col gap-1">
                    <div className="h-1.5 w-5 rounded-full bg-flash" />
                    <div className="h-1.5 w-5 rounded-full bg-white" />
                    <div className="h-1.5 w-5 rounded-full bg-flash" />
                </div>
            </div>
            <span>CORELY</span>
        </div>
    );
}
