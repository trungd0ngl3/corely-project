import { Star } from "lucide-react";

interface ReviewSummaryProps {
    rating: number;
    reviewCount: number;
    distribution: number[];
}

export function ReviewSummary({ rating, reviewCount, distribution }: ReviewSummaryProps) {
    return (
        <section>
            <h2 className="mb-4 text-xl font-bold text-on-surface">Reviews & Ratings</h2>
            <div className="flex flex-col gap-6 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 sm:flex-row sm:items-center">
                {/* Overall Rating */}
                <div className="flex flex-col items-center gap-1 sm:min-w-[140px]">
                    <span className="text-5xl font-bold text-on-surface">{rating}</span>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.round(rating) ? "fill-yellow-500 text-yellow-500" : "fill-surface-container-high text-surface-container-high"}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-on-surface-variant/60">
                        {reviewCount} Reviews
                    </span>
                </div>

                {/* Distribution */}
                <div className="flex-1 space-y-2">
                    {distribution.map((pct, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="w-8 text-right text-sm font-medium text-on-surface-variant">
                                {5 - i}★
                            </span>
                            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-container-high">
                                <div
                                    className="h-full rounded-full bg-yellow-500"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <span className="w-10 text-right text-xs text-on-surface-variant/60">
                                {pct}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}