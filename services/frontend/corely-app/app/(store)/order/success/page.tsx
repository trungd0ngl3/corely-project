import Link from "next/link";
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
                <p className="text-gray-500 mb-8">Thank you for your purchase. {"We've"} received your order and will process it right away.</p>

                <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                    <h2 className="font-semibold text-lg mb-4 border-b pb-2">Order Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                            <span className="text-sm text-gray-500 block">Order ID</span>
                            <span className="font-medium text-gray-900">#CRL202606140001</span>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500 block">Total Amount</span>
                            <span className="font-medium text-red-600">39.578.000đ</span>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500 block">Payment Method</span>
                            <span className="font-medium text-gray-900 flex items-center gap-2">
                                VNPay
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">PAID</span>
                            </span>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500 block">Expected Delivery</span>
                            <span className="font-medium text-gray-900">Tomorrow</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" className="h-12 px-8" asChild>
                        <Link href="/order/tracking">
                            <Truck className="w-4 h-4 mr-2" />
                            Track Order
                        </Link>
                    </Button>
                    <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href="/">
                            Continue Shopping
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Next Steps Info */}
            <div className="max-w-2xl w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Order Prepared</h3>
                    <p className="text-sm text-gray-500">We are packing your items securely.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Shipped</h3>
                    <p className="text-sm text-gray-500">Handed over to our delivery partner.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm opacity-50">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Delivered</h3>
                    <p className="text-sm text-gray-500">Package arrives at your door.</p>
                </div>
            </div>
        </div>
    );
}