"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ShippingForm() {
    const [addressType, setAddressType] = useState("new");

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Saved Addresses</h3>
                <RadioGroup value={addressType} onValueChange={setAddressType} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="home" id="addr-home" />
                        <Label htmlFor="addr-home">Home</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="company" id="addr-company" />
                        <Label htmlFor="addr-company">Company</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="addr-new" />
                        <Label htmlFor="addr-new">New Address</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="Nguyen Van A" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="0901234567" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                </div>

                {addressType === "new" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div className="space-y-2">
                                <Label htmlFor="province">Province/City</Label>
                                <select id="province" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="">Select Province/City</option>
                                    <option value="sg">Hồ Chí Minh</option>
                                    <option value="hn">Hà Nội</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district">District</Label>
                                <select id="district" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="">Select District</option>
                                    <option value="td">Thủ Đức</option>
                                    <option value="1">Quận 1</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ward">Ward</Label>
                                <select id="ward" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="">Select Ward</option>
                                    <option value="lt">Linh Trung</option>
                                    <option value="bnt">Bến Nghé</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input id="address" placeholder="123 Example St" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}