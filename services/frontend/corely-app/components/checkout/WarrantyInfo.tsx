import { ShieldCheck } from "lucide-react";

export function WarrantyInfo() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-6">
            <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                    <h3 className="font-semibold text-gray-900">Warranty Information</h3>
                    <div className="mt-2 text-sm text-gray-600">
                        <p className="font-medium text-gray-900">RTX 5070 Ti</p>
                        <p>36 Months Warranty</p>
                        <p>Official ASUS Vietnam</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mt-0.5">
                        <span className="text-xs font-bold">i</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Assembly Service</h3>
                        <div className="mt-2 flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                                <span className="text-sm text-gray-600">Build PC for me</span>
                            </label>
                            <span className="text-sm font-medium text-gray-900">+300.000đ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}