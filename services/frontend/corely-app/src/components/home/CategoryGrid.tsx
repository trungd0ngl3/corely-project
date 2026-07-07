import Link from "next/link";
import { CATEGORIES } from "@/lib/mock-data";

export function CategoryGrid() {
    return (
        <section className="py-16 bg-surface">
            <div className="container-max">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.name}
                            href={cat.href}
                            className="group flex flex-col items-center justify-center rounded-2xl bg-surface-container-lowest p-6 shadow-level-1 transition-all hover:shadow-level-2 hover:-translate-y-1"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container text-primary-container group-hover:bg-primary-container group-hover:text-white transition-colors">
                                <cat.icon className="h-7 w-7" />
                            </div>
                            <span className="mt-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant group-hover:text-primary-container transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}