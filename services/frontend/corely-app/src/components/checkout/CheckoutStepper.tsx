import { Check } from "lucide-react";

export function CheckoutStepper() {
    return (
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto pt-4">
            <div className="flex flex-col items-center relative z-10 bg-gray-50 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check className="h-5 w-5" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-900">Cart</span>
            </div>
            <div className="flex-1 h-px bg-blue-600 -mx-4 -mt-6 relative z-0"></div>
            <div className="flex flex-col items-center relative z-10 bg-gray-50 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                </div>
                <span className="mt-2 text-sm font-medium text-blue-600">Checkout</span>
            </div>
            <div className="flex-1 h-px bg-gray-200 -mx-4 -mt-6 relative z-0"></div>
            <div className="flex flex-col items-center relative z-10 bg-gray-50 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                    <div className="h-2.5 w-2.5 rounded-full bg-transparent"></div>
                </div>
                <span className="mt-2 text-sm font-medium text-gray-500">Order Complete</span>
            </div>
        </div>
    );
}