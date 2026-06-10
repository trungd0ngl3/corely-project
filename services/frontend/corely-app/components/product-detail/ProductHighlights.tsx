import { Check } from "lucide-react";

interface ProductHighlightsProps {
    features: string[];
}

export function ProductHighlights({ features }: ProductHighlightsProps) {
    return (
        <section>
            <h2 className="mb-4 text-xl font-bold text-on-surface">Highlights</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {features.map((feature) => (
                    <div
                        key={feature}
                        className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                    >
                        <Check className="h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm font-medium text-on-surface">{feature}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}