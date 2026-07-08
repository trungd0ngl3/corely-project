"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export function CouponForm() {
    const [code, setCode] = useState("");
    const { applyCoupon, removeCoupon, serverCart, isLoading } = useCart();

    const handleApply = async () => {
        if (!code.trim()) return;
        try {
            await applyCoupon(code);
            setCode("");
        } catch (err: unknown) {
            const message = axios.isAxiosError(err) ? err.response?.data?.message : (err instanceof Error ? err.message : "Failed to apply coupon");
            toast.error(message);
        }
    };

    const handleRemove = async () => {
        try {
            await removeCoupon();
        } catch (err: unknown) {
            const message = axios.isAxiosError(err) ? err.response?.data?.message : (err instanceof Error ? err.message : "Failed to remove coupon");
            toast.error(message);
        }
    };

    return (
        <div className="mb-6 space-y-2">
            <p className="text-sm font-medium">Discount Code</p>
            {serverCart?.voucherCode ? (
                <div className="flex items-center justify-between p-2 border rounded bg-muted/50">
                    <span className="font-medium text-green-600">{serverCart.voucherCode} applied!</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemove}
                        disabled={isLoading}
                    >
                        Remove
                    </Button>
                </div>
            ) : (
                <div className="flex space-x-2">
                    <Input
                        placeholder="Enter discount code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                        disabled={isLoading}
                    />
                    <Button
                        variant="secondary"
                        onClick={handleApply}
                        disabled={isLoading || !code.trim()}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                    </Button>
                </div>
            )}
        </div>
    );
}