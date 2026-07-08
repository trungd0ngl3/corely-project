import type { SpecGroup } from "@/lib/mock-product-detail";

interface ProductSpecsProps {
    specifications: SpecGroup[];
}

export function ProductSpecs({ specifications }: ProductSpecsProps) {
    return (
        <section>
            <h2 className="mb-4 text-xl font-bold text-on-surface">Specifications</h2>
            <div className="overflow-hidden rounded-2xl border border-outline-variant">
                {specifications.map((group, gi) => (
                    <div key={group.title}>
                        <div className="bg-surface-container-low px-6 py-3">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant/70">
                                {group.title}
                            </h3>
                        </div>
                        {group.specs.map((spec, si) => (
                            <div
                                key={spec.label}
                                className={`grid grid-cols-2 px-6 py-3 text-sm ${si % 2 === 0 ? "bg-surface" : "bg-surface-container-lowest"
                                    }`}
                            >
                                <span className="font-medium text-on-surface-variant">
                                    {spec.label}
                                </span>
                                <span className="font-semibold text-on-surface">
                                    {spec.value}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}