"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserService } from "@/services/user.service";
import { AddressService } from "@/services/address.service";
import { OrderService } from "@/services/order.service";
import { AddressResponse } from "@/types/address";
import { UserResponse } from "@/types/user";
import { OrderResponse } from "@/types/order";

const statusColor: Record<OrderResponse["status"], string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    PROCESSING: "bg-indigo-100 text-indigo-700",
    SHIPPED: "bg-cyan-100 text-cyan-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
    RETURNED: "bg-orange-100 text-orange-700",
};

const statusText: Record<OrderResponse["status"], string> = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    PROCESSING: "Đang chuẩn bị",
    SHIPPED: "Đang giao",
    DELIVERED: "Đã giao",
    CANCELLED: "Đã hủy",
    RETURNED: "Đã trả hàng",
};

type Address = AddressResponse;
import { useAuthStore } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function UnifiedProfilePage() {
    const { accessToken, isHydrated } = useAuthStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserResponse | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);

    const fetchAddresses = async () => {
        const response = await AddressService.getMyAddresses();
        const data = (response as any).data;
        setAddresses(Array.isArray(data) ? data : (data?.result ?? []));
    };
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [formData, setFormData] = useState({ streetAddress: "", ward: "", district: "", city: "" });

    useEffect(() => {
        if (editingAddress) {
            setFormData({
                streetAddress: editingAddress.streetAddress,
                ward: editingAddress.ward,
                district: editingAddress.district,
                city: editingAddress.city,
            });
        } else {
            setFormData({ streetAddress: "", ward: "", district: "", city: "" });
        }
    }, [editingAddress]);

    const handleSave = async () => {
        try {
            if (editingAddress) {
                await AddressService.updateAddress(editingAddress.id, formData);
                toast.success("Address updated");
            } else {
                await AddressService.createAddress(formData);
                toast.success("Address added");
            }
            setIsEditing(false);
            await fetchAddresses();
        } catch {
            toast.error("Save failed");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await AddressService.deleteAddress(id);
            toast.success("Address deleted");
            await fetchAddresses();
        } catch {
            toast.error("Delete failed");
        }
    };

    useEffect(() => {
        if (!isHydrated) return;
        if (!accessToken) {
            router.replace("/auth/login");
            return;
        }

        const loadData = async () => {
            setLoading(true);
            try {
                const [user, orders] = await Promise.all([
                    UserService.getMyInfo(),
                    OrderService.getMyOrder({ page: 0, size: 10 }),
                ]);
                await fetchAddresses();
                setProfile((user as any));
                setOrders((orders as any).content ?? []);
            } catch (err: unknown) {
                console.error("Load data error:", err);
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [accessToken, isHydrated, router]);

    if (!isHydrated || loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>
            <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); router.push(`?tab=${v}`); }}>
                <TabsList className="mb-8 w-full justify-start bg-transparent p-0 border-b">
                    <TabsTrigger value="profile" className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Profile</TabsTrigger>
                    <TabsTrigger value="addresses" className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Addresses</TabsTrigger>
                    <TabsTrigger value="orders" className="px-6 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
                        <p><strong>Name:</strong> {profile?.fullName}</p>
                        <p><strong>Email:</strong> {profile?.email}</p>
                        <p><strong>Phone:</strong> {profile?.phone}</p>
                    </div>
                </TabsContent>

                <TabsContent value="addresses">
                    {isEditing ? (
                        <div className="p-6 border rounded-xl bg-white shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">{editingAddress ? "Update Address" : "Add Address"}</h3>
                            <div className="space-y-4">
                                <input placeholder="Street Address" className="w-full p-2 border rounded" value={formData.streetAddress} onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })} />
                                <input placeholder="Ward" className="w-full p-2 border rounded" value={formData.ward} onChange={(e) => setFormData({ ...formData, ward: e.target.value })} />
                                <input placeholder="District" className="w-full p-2 border rounded" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} />
                                <input placeholder="City" className="w-full p-2 border rounded" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                <div className="flex gap-2">
                                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
                                    <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded">Save</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => { setEditingAddress(null); setIsEditing(true); }} className="mb-4 px-4 py-2 bg-primary text-white rounded-lg">Add Address</button>
                            {addresses.length === 0 ? (
                                <p className="text-gray-500">No addresses found.</p>
                            ) : (
                                <div className="space-y-4">
                                    {addresses.map((addr) => (
                                        <div key={addr.id} className="p-4 border rounded-lg flex justify-between items-center">
                                            <p className="text-sm text-gray-600">{addr.streetAddress}, {addr.ward}, {addr.district}, {addr.city}</p>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => { setEditingAddress(addr); setIsEditing(true); }}
                                                    className="text-sm text-primary hover:underline"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(addr.id)}
                                                    className="text-sm text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </TabsContent>

                <TabsContent value="orders">
                    {selectedOrder ? (
                        <div className="p-6 border rounded-xl bg-white shadow-sm">
                            <button onClick={() => setSelectedOrder(null)} className="mb-4 text-sm text-primary hover:underline">← Back to list</button>
                            <h3 className="text-lg font-semibold mb-4">Order #{selectedOrder.orderCode}</h3>
                            <p><strong>Status:</strong> <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[selectedOrder.status]}`}>{statusText[selectedOrder.status]}</span></p>
                            <p><strong>Total:</strong> ${selectedOrder.totalAmount}</p>
                            <div className="mt-4">
                                <h4 className="font-medium">Items:</h4>
                                {selectedOrder.items?.map((item: any) => (
                                    <div key={item.id} className="flex justify-between py-2 border-b">
                                        <span>{item.productName} x {item.quantity}</span>
                                        <span>${item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="p-4 border rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Order #{order.orderCode}</p>
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[order.status]}`}>{statusText[order.status]}</span>
                                    </div>
                                    <button onClick={() => setSelectedOrder(order)} className="px-3 py-1 border rounded text-sm">View Details</button>
                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}