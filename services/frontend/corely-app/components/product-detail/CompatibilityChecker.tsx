import { Check, Cpu } from "lucide-react";

interface CompatibilityCheckerProps {
    compatibility: string[];
}

export function CompatibilityChecker({ compatibility }: CompatibilityCheckerProps) {
    return (
        <section>
            <h2 className="mb-4 text-xl font-bold text-on-surface">Compatibility</h2>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                <p className="mb-4 text-sm font-medium text-on-surface-variant">
                    Compatible With:
                </p>
                <ul className="space-y-3">
                    {compatibility.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-on-surface">
                            <Check className="h-4 w-4 shrink-0 text-success" />
                            {item}
                        </li>
                    ))}
                </ul>
                <button className="mt-6 flex items-center gap-2 rounded-xl border border-primary bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10">
                    <Cpu className="h-4 w-4" />
                    Check With My Build
                </button>
            </div>
        </section>
    );
}