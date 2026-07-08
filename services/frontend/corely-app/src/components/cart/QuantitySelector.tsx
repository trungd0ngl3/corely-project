"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuantitySelectorProps {
    quantity: number;
    maxQuantity?: number;
    onUpdate: (quantity: number) => void;
}

export function QuantitySelector({ quantity, maxQuantity = 10, onUpdate }: QuantitySelectorProps) {
    const handleDecrease = () => {
        if (quantity > 1) {
            onUpdate(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            onUpdate(quantity + 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 1 && val <= maxQuantity) {
            onUpdate(val);
        }
    };

    return (
        <div className="flex items-center space-x-1">
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleDecrease}
                disabled={quantity <= 1}
            >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease</span>
            </Button>
            <Input
                type="number"
                value={quantity}
                onChange={handleChange}
                className="h-8 w-12 text-center text-sm p-0 border-none bg-transparent"
                min={1}
                max={maxQuantity}
            />
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleIncrease}
                disabled={quantity >= maxQuantity}
            >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase</span>
            </Button>
        </div>
    );
}