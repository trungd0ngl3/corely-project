"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AddressService } from "@/services/address.service";
import { AddressResponse, AddressRequest } from "@/types/address";
import { useAuthStore } from "@/hooks/use-auth";

export default function AddressPage() {
    const { accessToken } = useAuthStore();
    const router = useRouter();
    const [addresses, setAddresses] = useState<AddressResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<AddressRequest>({
        streetAddress: "",
        ward: "",
        district: "",
        city: ""
    });

    useEffect(() => {
        if (!accessToken) {
            router.push("/auth/login");
            return;
        }
        loadAddresses();
    }, []);

    async function loadAddresses() {
        try {
            const res = await AddressService.getMyAddresses();
            setAddresses(res.data || []);
        } catch (err) {
            console.error("Failed to fetch addresses:", err);
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setForm({ streetAddress: "", ward: "", district: "", city: "" });
        setShowForm(false);
        setEditingId(null);
    }

    function handleEdit(addr: AddressResponse) {
        setForm({
            streetAddress: addr.streetAddress,
            ward: addr.ward,
            district: addr.district,
            city: addr.city
        });
        setEditingId(addr.id);
        setShowForm(true);
    }

    async function handleSave() {
        try {
            if (editingId) {
                await AddressService.updateAddress(editingId, form);
            } else {
                await AddressService.createAddress(form);
            }
            resetForm();
            loadAddresses();
        } catch (err) {
            console.error("Failed to save address:", err);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Xóa địa chỉ này?")) return;
        try {
            await AddressService.deleteAddress(id);
            loadAddresses();
        } catch (err) {
            console.error("Failed to delete address:", err);
        }
    }

    if (loading) return <div className="max-w-xl mx-auto py-12">Loading...</div>;

    return (
        <div className="max-w-xl mx-auto py-12">
            <h1 className="headline-lg mb-4">Address</h1>

            {addresses.length > 0 ? (
                <div className="space-y-3 mb-6">
                    {addresses.map(addr => (
                        <div key={addr.id} className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant flex justify-between items-start">
                            <div>
                                <p className="text-sm text-on-surface-variant">{addr.streetAddress}, {addr.ward}, {addr.district}, {addr.city}</p>
                                {addr.isDefault && <span className="text-xs bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full">Mặc định</span>}
                            </div>
                            <div className="flex gap-2">
                                <button className="text-primary text-sm" onClick={() => handleEdit(addr)}>Sửa</button>
                                <button className="text-error text-sm" onClick={() => handleDelete(addr.id)}>Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-on-surface-variant mb-6">Chưa có địa chỉ nào.</p>
            )}

            {!showForm ? (
                <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>+ Thêm địa chỉ mới</button>
            ) : (
                <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant">
                    <h2 className="title-md mb-4">{editingId ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}</h2>
                    {["streetAddress", "ward", "district", "city"].map(field => (
                        <div key={field} className="mb-4">
                            <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                            <input
                                className="w-full rounded border px-3 py-2"
                                name={field}
                                value={form[field as keyof AddressRequest] as string}
                                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                            />
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <button className="btn-primary" onClick={handleSave}>Save</button>
                        <button className="btn-secondary" onClick={resetForm}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}