"use client";

import { useCart } from "@/store/use-cart";
import { Check, X } from "lucide-react";

export function BuildProgress() {
    const { items } = useCart();

    if (items.length === 0) return null;

    // Very basic heuristic for PC building progress
    const parts = {
        CPU: items.some(i => i.category === "CPU" || i.name.includes("Processor") || i.name.includes("Core i") || i.name.includes("Ryzen")),
        GPU: items.some(i => i.category === "GPU" || i.name.includes("RTX") || i.name.includes("Radeon")),
        Motherboard: items.some(i => i.category === "Motherboard" || i.name.includes("Motherboard") || i.name.includes("Z790") || i.name.includes("X670") || i.name.includes("B650")),
        RAM: items.some(i => i.category === "RAM" || i.name.includes("RAM") || i.name.includes("DDR")),
        Storage: items.some(i => i.category === "SSD" || i.name.includes("SSD") || i.name.includes("NVMe")),
        Case: items.some(i => i.category === "Case" || i.name.includes("Case") || i.name.includes("Tower")),
        PSU: items.some(i => i.category === "PSU" || i.name.includes("PSU") || i.name.includes("Power Supply")),
    };

    // Only show if they seem to be building a PC (have at least 2 core components)
    const activePartsCount = Object.values(parts).filter(Boolean).length;
    if (activePartsCount < 2) return null;

    return (
        <div className="bg-card border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">PC Build Progress</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
                {Object.entries(parts).map(([part, isPresent]) => (
                    <div key={part} className={`flex items-center gap-2 ${isPresent ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {isPresent ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        <span>{part}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}