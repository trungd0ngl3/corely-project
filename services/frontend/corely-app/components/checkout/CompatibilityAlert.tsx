"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import { useCart } from "@/store/use-cart";

export function CompatibilityAlert() {
    const { items } = useCart();

    // Simplistic check for demo purposes
    // If cart has items, we assume it's compatible for demo unless specific items are there
    const hasItems = items.length > 0;
    const isCompatible = true; // In a real app, this would be an API call

    if (!hasItems) return null;

    if (isCompatible) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-green-800">Compatibility Check Passed</h3>
                    <ul className="mt-1 text-sm text-green-700 space-y-1">
                        <li>✓ CPU compatible with Motherboard</li>
                        <li>✓ GPU fits in selected Case</li>
                        <li>✓ PSU wattage sufficient (Recommended: 750W, Selected: 850W)</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
                <h3 className="font-semibold text-amber-800">Compatibility Warning</h3>
                <div className="mt-1 text-sm text-amber-700">
                    <p>RTX 5090 requires 850W PSU minimum.</p>
                    <p className="font-medium mt-1">Current PSU: 750W</p>
                </div>
            </div>
        </div>
    );
}