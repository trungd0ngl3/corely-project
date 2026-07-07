import { Cpu, HardDrive, Monitor, Power, Layout, Plus, Check, AlertCircle } from "lucide-react";

const BUILD_STEPS = [
    { id: "cpu", name: "Processor", icon: Cpu, required: true },
    { id: "motherboard", name: "Motherboard", icon: Layout, required: true },
    { id: "memory", name: "Memory (RAM)", icon: HardDrive, required: true },
    { id: "gpu", name: "Graphics Card", icon: Monitor, required: false },
    { id: "storage", name: "Storage (SSD/HDD)", icon: HardDrive, required: true },
    { id: "psu", name: "Power Supply", icon: Power, required: true },
];

export default function PCBuilderPage() {
    return (
        <div className="bg-surface min-h-screen py-12">
            <div className="container-max">
                <div className="mb-8">
                    <h1 className="headline-lg text-on-surface mb-2">PC Builder</h1>
                    <p className="text-on-surface-variant">Select compatible parts to build your dream high-performance PC.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Builder Steps */}
                    <div className="lg:col-span-8 space-y-4">
                        {BUILD_STEPS.map((step) => (
                            <div
                                key={step.id}
                                className="group flex items-center justify-between rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 transition-all hover:border-primary/30"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="rounded-xl bg-surface-container-low p-4 text-on-surface-variant group-hover:text-primary transition-colors">
                                        <step.icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-on-surface">{step.name}</h3>
                                            {step.required && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-error">Required</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-on-surface-variant">Not selected</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-container transition-all">
                                    <Plus className="h-4 w-4" />
                                    Choose {step.name}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Build Summary Sticky */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                                <h3 className="headline-md mb-6">Build Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-on-surface-variant">Estimated Wattage</span>
                                        <span className="font-bold text-on-surface">0W</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-on-surface-variant">Compatibility</span>
                                        <span className="flex items-center gap-1 font-bold text-success">
                                            <Check className="h-4 w-4" />
                                            Perfect
                                        </span>
                                    </div>
                                    <div className="h-px bg-outline-variant" />
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-medium text-on-surface-variant">Total Price</span>
                                        <span className="text-2xl font-bold text-primary">0 ₫</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full rounded-xl bg-primary py-4 text-sm font-bold text-white opacity-50 cursor-not-allowed">
                                        Add All to Cart
                                    </button>
                                    <button className="w-full rounded-xl border border-outline-variant py-4 text-sm font-bold text-on-surface hover:bg-surface-container-low transition-all">
                                        Save Build
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-orange/30 bg-orange/5 p-6">
                                <div className="flex gap-3">
                                    <AlertCircle className="h-5 w-5 text-orange shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-orange mb-1">Compatibility Note</h4>
                                        <p className="text-xs text-on-surface-variant leading-relaxed">
                                            Our builder automatically filters parts based on compatibility. However, always double-check physical clearances for cases and coolers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}