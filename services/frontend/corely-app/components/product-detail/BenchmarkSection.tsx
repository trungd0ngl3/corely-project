import { Gamepad2 } from "lucide-react";
import type { BenchmarkEntry } from "@/lib/mock-product-detail";

interface BenchmarkSectionProps {
    benchmarks: BenchmarkEntry[];
}

export function BenchmarkSection({ benchmarks }: BenchmarkSectionProps) {
    const maxFps = Math.max(...benchmarks.map((b) => b.fps));

    const getFpsColor = (fps: number) => {
        if (fps >= 144) return "bg-success text-success";
        if (fps >= 60) return "bg-primary text-primary";
        return "bg-orange text-orange";
    };

    return (
        <section>
            <div className="mb-4 flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-on-surface">Performance Benchmarks</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-outline-variant">
                {benchmarks.map((bench, i) => {
                    const colors = getFpsColor(bench.fps);
                    const barWidth = (bench.fps / maxFps) * 100;
                    return (
                        <div
                            key={`${bench.game}-${bench.resolution}`}
                            className={`grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-3 ${i % 2 === 0 ? "bg-surface" : "bg-surface-container-lowest"
                                }`}
                        >
                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-on-surface">
                                    {bench.game}
                                </div>
                                <div className="text-xs text-on-surface-variant/60">
                                    {bench.resolution}
                                </div>
                                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                                    <div
                                        className={`h-full rounded-full ${colors.split(" ")[0]}/30`}
                                        style={{ width: `${barWidth}%` }}
                                    />
                                </div>
                            </div>
                            <span className={`text-lg font-bold ${colors.split(" ")[1]}`}>
                                {bench.fps} <span className="text-xs font-normal">FPS</span>
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}