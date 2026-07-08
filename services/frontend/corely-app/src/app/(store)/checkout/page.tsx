"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OrderService } from "@/services/order.service";
import { CartService } from "@/services/cart.service";
import { UserService } from "@/services/user.service";
import { AddressService } from "@/services/address.service";
import { OrderCreationRequest } from "@/types/order";
import { toast } from "sonner";

export default function CheckoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [newAddress, setNewAddress] = useState({ streetAddress: "", ward: "", district: "", city: "" });
    const [cart, setCart] = useState<any>(null);

    useEffect(() => {
        Promise.all([
            AddressService.getMyAddresses(),
            CartService.getCart()
        ]).then(([addrRes, cartRes]) => {
            const data = (addrRes as any).data;
            const list = Array.isArray(data) ? data : (data?.result ?? []);
            setAddresses(list);
            if (list.length > 0) {
                const addr = list[0];
                setSelectedAddress(`${addr.streetAddress}, ${addr.ward}, ${addr.district}, ${addr.city}`);
            }
            setCart((cartRes as any).result);
        });
    }, []);

    const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cart = await CartService.getCart();
        if (!cart || (cart as any).result?.items?.length === 0) {
            toast.error("Giỏ hàng trống");
            router.push("/products");
            return;
        }

        setLoading(true);

        const finalAddress = isAdding
            ? `${newAddress.streetAddress}, ${newAddress.ward}, ${newAddress.district}, ${newAddress.city}`
            : selectedAddress;

        const data: OrderCreationRequest = {
            storeId: "00000000-0000-0000-0000-000000000000",
            shippingAddress: finalAddress,
            shippingMethod: "STANDARD",
            paymentMethod: "COD",
        };

        try {
            const res = await OrderService.createOrder(data);
            toast.success("Order placed successfully");
            router.replace(`/checkout/success?orderCode=${(res as any).orderCode}`);
        } catch (error) {
            toast.error("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-max py-12 grid md:grid-cols-2 gap-12">
            <div>
                <h1 className="text-headline-lg mb-8">Checkout</h1>
                {cart && (
                    <div className="mb-8 p-4 border rounded-lg bg-surface-container-low">
                        <h2 className="font-semibold mb-4">Order Summary</h2>
                        {cart.items?.map((item: any) => (
                            <div key={item.id} className="flex justify-between py-2 text-sm">
                                <span>{item.productName} x {item.quantity}</span>
                                <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}</span>
                            </div>
                        ))}
                        <div className="border-t mt-4 pt-4 font-bold flex justify-between">
                            <span>Total</span>
                            <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(cart.totalAmount)}</span>
                        </div>
                    </div>
                )}
                <form onSubmit={handleCheckout} className="space-y-6">
                    <div>
                        <label className="block text-label-md mb-2">Shipping Address</label>
                        {!isAdding && addresses.length > 0 ? (
                            <select
                                className="w-full p-3 border rounded mb-4"
                                value={selectedAddress}
                                onChange={(e) => setSelectedAddress(e.target.value)}
                            >
                                {addresses.map((a, i) => (
                                    <option key={i} value={`${a.streetAddress}, ${a.ward}, ${a.district}, ${a.city}`}>
                                        {a.streetAddress}, {a.ward}, {a.district}, {a.city}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="space-y-2 mb-4">
                                <input placeholder="Street" className="w-full p-2 border rounded" onChange={(e) => setNewAddress({ ...newAddress, streetAddress: e.target.value })} />
                                <input placeholder="Ward" className="w-full p-2 border rounded" onChange={(e) => setNewAddress({ ...newAddress, ward: e.target.value })} />
                                <input placeholder="District" className="w-full p-2 border rounded" onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })} />
                                <input placeholder="City" className="w-full p-2 border rounded" onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
                            </div>
                        )}
                        <button type="button" onClick={() => setIsAdding(!isAdding)} className="text-primary text-sm underline">
                            {isAdding ? "Use saved addresses" : "Add new address"}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-on-primary px-6 py-3 rounded font-semibold disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>
                </form>
            </div>
        </div>
    );
}
