"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function VATInvoiceForm() {
    const [needInvoice, setNeedInvoice] = useState(false);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="vat-invoice"
                    checked={needInvoice}
                    onCheckedChange={(checked) => setNeedInvoice(checked as boolean)}
                />
                <Label htmlFor="vat-invoice" className="font-medium text-gray-900 cursor-pointer">
                    Need VAT Invoice?
                </Label>
            </div>

            {needInvoice && (
                <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" placeholder="Enter company name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="taxCode">Tax Code</Label>
                        <Input id="taxCode" placeholder="Enter tax code" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="companyAddress">Company Address</Label>
                        <Input id="companyAddress" placeholder="Enter company address" />
                    </div>
                </div>
            )}
        </div>
    );
}