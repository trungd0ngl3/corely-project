"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function DeliveryMethod() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Delivery Method</h2>

            <RadioGroup defaultValue="standard" className="space-y-4 mb-8">
                <div className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:bg-gray-50 [&:has(:checked)]:border-blue-600 [&:has(:checked)]:bg-blue-50">
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="cursor-pointer">
                            <div className="font-medium text-gray-900">Standard Delivery</div>
                            <div className="text-sm text-gray-500">1-3 days</div>
                        </Label>
                    </div>
                    <div className="font-medium">Free</div>
                </div>

                <div className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:bg-gray-50 [&:has(:checked)]:border-blue-600 [&:has(:checked)]:bg-blue-50">
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="cursor-pointer">
                            <div className="font-medium text-gray-900">Express Delivery</div>
                            <div className="text-sm text-gray-500">Same Day</div>
                        </Label>
                    </div>
                    <div className="font-medium">50.000đ</div>
                </div>
            </RadioGroup>

            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Order Notes</h3>
                <Textarea
                    placeholder="Call before delivery..."
                    className="min-h-[100px]"
                />
            </div>
        </div>
    );
}