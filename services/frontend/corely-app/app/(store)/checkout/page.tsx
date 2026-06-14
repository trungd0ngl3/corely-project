import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { DeliveryMethod } from "@/components/checkout/DeliveryMethod";
import { PaymentMethod } from "@/components/checkout/PaymentMethod";
import { VATInvoiceForm } from "@/components/checkout/VATInvoiceForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PlaceOrderButton } from "@/components/checkout/PlaceOrderButton";
import { CompatibilityAlert } from "@/components/checkout/CompatibilityAlert";
import { WarrantyInfo } from "@/components/checkout/WarrantyInfo";

export default function CheckoutPage() {
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <CheckoutStepper />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Form (65%) */}
                <div className="w-full lg:w-[65%] space-y-6">
                    <CompatibilityAlert />
                    <ShippingForm />
                    <DeliveryMethod />
                    <PaymentMethod />
                    <VATInvoiceForm />
                </div>

                {/* Right Column - Summary (35%) */}
                <div className="w-full lg:w-[35%] space-y-6">
                    <div className="sticky top-8">
                        <OrderSummary />
                        <WarrantyInfo />
                        <div className="mt-6 hidden lg:block">
                            <PlaceOrderButton />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:hidden z-50 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold text-red-600">39.578.000đ</p>
                </div>
                <PlaceOrderButton className="w-auto px-8" />
            </div>
        </div>
    );
}