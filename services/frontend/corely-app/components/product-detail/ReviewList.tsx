import { Star, BadgeCheck } from "lucide-react";
import type { Review } from "@/lib/mock-product-detail";

interface ReviewListProps {
    reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-on-surface">
                                    {review.author}
                                </span>
                                {review.verified && (
                                    <span className="flex items-center gap-1 text-xs text-success">
                                        <BadgeCheck className="h-3.5 w-3.5" />
                                        Verified Purchase
                                    </span>
                                )}
                            </div>
                            <div className="mt-1 flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-3.5 w-3.5 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "fill-surface-container-high text-surface-container-high"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="text-xs text-on-surface-variant/50">{review.date}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    );
}