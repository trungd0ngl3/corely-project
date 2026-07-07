"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMyInfo, addressApi, Address } from "@/services/user.service";
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
    const [profile, setProfile] = useState<any>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        if (!isHydrated) return;
        if (!accessToken) {
            router.replace("/auth/login");
            return;
        }

        const loadData = async () => {
            setLoading(true);
            try {
                const [userRes, addrRes, orderRes] = await Promise.all([
                    getMyInfo(accessToken!),
                    addressApi.getAddresses(accessToken!),
                    getMyOrders(accessToken!),
                ]);
                setProfile(userRes.result || userRes);
                setAddresses((addrRes.result || addrRes) ?? []);
                setOrders((orderRes.result || orderRes) ?? []);
            } catch (err) {
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
                <TabsList className="mb-8">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
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
                    <div className="space-y-4">
                        {addresses.map((addr) => (
                            <div key={addr.id} className="p-4 border rounded-lg">
                                <p className="font-medium">{addr.recipientName} | {addr.phone}</p>
                                <p className="text-sm text-gray-600">{addr.street}, {addr.ward}, {addr.district}, {addr.city}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="orders">
                    <div className="space-y-4">
                        {orders.map((order: any) => (
                            <div key={order.id} className="p-4 border rounded-lg flex justify-between">
                                <span>Order #{order.id}</span>
                                <span>{order.status}</span>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}