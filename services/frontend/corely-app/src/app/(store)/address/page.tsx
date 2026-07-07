"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addressApi, Address } from "@/services/user.service";
import { useAuthStore } from "@/hooks/use-auth";

export default function AddressPage() {
    const { accessToken } = useAuthStore();
    const router = useRouter();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState({
        recipientName: "",
        phone: "",
        street: "",
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
            const res = await addressApi.getAddresses(accessToken!);
            setAddresses(res.result || []);
        } catch (err) {
            console.error("Failed to fetch addresses:", err);
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setForm({ recipientName: "", phone: "", street: "", ward: "", district: "", city: "" });
        setShowForm(false);
        setEditingId(null);
    }

    function handleEdit(addr: Address) {
        setForm({
            recipientName: addr.recipientName,
            phone: addr.phone,
            street: addr.street,
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
                await addressApi.updateAddress(editingId, form, accessToken!);
            } else {
                await addressApi.createAddress(form, accessToken!);
            }
            resetForm();
            loadAddresses();
        } catch (err) {
            console.error("Failed to save address:", err);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Xóa địa chỉ này?")) return;
        try {
            await addressApi.deleteAddress(id, accessToken!);
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
                                <p className="font-medium">{addr.recipientName} | {addr.phone}</p>
                                <p className="text-sm text-on-surface-variant">{addr.street}, {addr.ward}, {addr.district}, {addr.city}</p>
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
                    {["recipientName", "phone", "street", "ward", "district", "city"].map(field => (
                        <div key={field} className="mb-4">
                            <label className="block text-sm font-medium mb-1 capitalize">{field === "recipientName" ? "Recipient Name" : field}</label>
                            <input
                                className="w-full rounded border px-3 py-2"
                                name={field}
                                value={(form as any)[field]}
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