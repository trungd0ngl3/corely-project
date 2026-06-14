"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function PaymentMethod() {
    const [method, setMethod] = useState("credit-card");

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

            <RadioGroup value={method} onValueChange={setMethod} className="space-y-4">
                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 [&:has(:checked)]:border-blue-600 [&:has(:checked)]:bg-blue-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="cursor-pointer flex-1 font-medium">
                        Cash On Delivery (COD)
                    </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 [&:has(:checked)]:border-blue-600 [&:has(:checked)]:bg-blue-50">
                    <RadioGroupItem value="vnpay" id="vnpay" />
                    <Label htmlFor="vnpay" className="cursor-pointer flex-1 flex items-center justify-between font-medium">
                        <span>VNPay</span>
                        <div className="font-bold text-blue-600 text-xl tracking-tighter">VNPAY</div>
                    </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 [&:has(:checked)]:border-blue-600 [&:has(:checked)]:bg-blue-50">
                    <RadioGroupItem value="momo" id="momo" />
                    <Label htmlFor="momo" className="cursor-pointer flex-1 font-medium">
                        MoMo
                    </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 [&:has(:checked)]:border-blue-600 [&:has(:checked)]:bg-blue-50">
                    <RadioGroupItem value="zalopay" id="zalopay" />
                    <Label htmlFor="zalopay" className="cursor-pointer flex-1 font-medium">
                        ZaloPay
                    </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 [&:has(:checked)]:border-blue-600 [&:has(:checked)]:bg-blue-50">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="cursor-pointer flex-1 font-medium">
                        Bank Transfer
                    </Label>
                </div>

                <div className={`border rounded-lg p-4 ${method === 'credit-card' ? 'border-blue-600 bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center space-x-3 mb-4">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="cursor-pointer flex-1 font-medium">
                            Credit / Debit Card
                        </Label>
                    </div>

                    {method === "credit-card" && (
                        <div className="pl-7 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="bg-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM/YY" className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input id="cvv" placeholder="123" className="bg-white" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </RadioGroup>
        </div>
    );
}