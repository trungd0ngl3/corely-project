"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PlaceOrderButtonProps {
    className?: string;
}

export function PlaceOrderButton({ className = "" }: PlaceOrderButtonProps) {
    const router = useRouter();
    const { clearCart } = useCart();
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handlePlaceOrder = () => {
        if (!agreed) {
            alert("Please agree to the Terms & Conditions");
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            clearCart();
            router.push("/order/success");
        }, 1500);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    I agree to Terms & Conditions
                </Label>
            </div>
            <Button
                className={`w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold ${className}`}
                onClick={handlePlaceOrder}
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : "Place Order"}
            </Button>
        </div>
    );
}