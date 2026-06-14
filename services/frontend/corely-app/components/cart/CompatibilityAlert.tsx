"use client";

import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCart } from "@/store/use-cart";

export function CompatibilityAlert() {
    const { items } = useCart();

    // Mock compatibility logic based on task requirements
    // In a real scenario, this would use complex PC building rules

    // Example: Check if there's an RTX 5090 but PSU is < 850W
    // For simplicity, let's just trigger a warning if cart contains a specific high-end GPU string
    const hasHighEndGPU = items.some(item =>
        item.name.includes("RTX 5090") || item.name.includes("RTX 5080") || item.name.includes("RTX 5070")
    );

    const hasAdequatePSU = items.some(item =>
        item.name.includes("850W") || item.name.includes("1000W") || item.name.includes("1200W")
    );

    const hasAnyPSU = items.some(item => item.name.includes("PSU") || item.name.includes("Power Supply"));

    if (!hasHighEndGPU || hasAdequatePSU) return null;

    return (
        <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Compatibility Warning</AlertTitle>
            <AlertDescription className="mt-2 text-sm">
                High-end GPU detected. We recommend at least an <strong>850W PSU</strong>.
                {hasAnyPSU && " Your current PSU in cart might not provide enough power."}
                {!hasAnyPSU && " Please consider adding a sufficient Power Supply."}
            </AlertDescription>
        </Alert>
    );
}