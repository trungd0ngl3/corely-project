'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Save, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ProductService } from "@/services/product.service";
import { UploadService } from "@/services/upload.service";
import { StoreService } from "@/services/store.service";
import { useEffect } from "react";

export default function AdminNewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [storeId, setStoreId] = useState("");

    useEffect(() => {
        StoreService.getStores().then(res => {
            if (res.data.length > 0) setStoreId(res.data[0].id);
        });
    }, []);
    const [formData, setFormData] = useState<{
        name: string;
        sku: string;
        price: number;
        discountPrice: number;
        stockQuantity: number;
        thumbnailUrl: string;
        categoryId: string;
        brandId: string;
        description: string;
        storeId: string;
        imageUrls: string[];
        specs: Record<string, any>;
        variants: { name: string; sku: string; price: number; stockQuantity: number; imageUrl: string }[];
    }>({
        name: "",
        sku: "",
        price: 0,
        discountPrice: 0,
        stockQuantity: 0,
        thumbnailUrl: "",
        categoryId: "00000000-0000-0000-0000-000000000000",
        brandId: "00000000-0000-0000-0000-000000000000",
        description: "",
        storeId: storeId,
        imageUrls: [],
        specs: {},
        variants: []
    });

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const res = await UploadService.uploadImage(e.target.files[0]);
            setFormData(prev => ({ ...prev, thumbnailUrl: res.data.url }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await ProductService.createProduct({ ...formData, storeId });
            router.push("/admin/products");
        } catch (err: any) {
            console.error("API Error:", err.response?.data);
            alert(JSON.stringify(err.response?.data?.message || "Error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/products">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add Product</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        <Save className="mr-2 h-4 w-4" />
                        {loading ? "Publishing..." : "Publish"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">General Information</h2>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Product Name</label>
                            <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. CPU Intel Core i9-14900K" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full min-h-[150px] p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                placeholder="Detailed product description..."
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">Media</h2>
                        <label className="border-2 border-dashed border-slate-300 rounded-lg p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer block">
                            <input type="file" className="hidden" onChange={handleUpload} />
                            <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                            <p className="text-sm font-medium text-slate-700">{formData.thumbnailUrl ? "Image uploaded" : "Click to upload"}</p>
                        </label>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">Pricing</h2>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Price (₫)</label>
                            <Input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} placeholder="0" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">Inventory</h2>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">SKU</label>
                            <Input value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} placeholder="e.g. INT-14900K" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Stock Quantity</label>
                            <Input type="number" value={formData.stockQuantity} onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })} placeholder="0" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">Variants</h2>
                        {formData.variants.map((v, i) => (
                            <div key={i} className="space-y-2 p-3 border rounded">
                                <Input placeholder="Variant Name" value={v.name} onChange={e => {
                                    const variants = [...formData.variants];
                                    variants[i].name = e.target.value;
                                    setFormData({ ...formData, variants });
                                }} />
                                <Input placeholder="Variant SKU" value={v.sku} onChange={e => {
                                    const variants = [...formData.variants];
                                    variants[i].sku = e.target.value;
                                    setFormData({ ...formData, variants });
                                }} />
                                <Input type="number" placeholder="Price" value={v.price} onChange={e => {
                                    const variants = [...formData.variants];
                                    variants[i].price = Number(e.target.value);
                                    setFormData({ ...formData, variants });
                                }} />
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, variants: [...formData.variants, { name: "", sku: "", price: 0, stockQuantity: 0, imageUrl: "" }] })}>
                            <Plus className="h-4 w-4 mr-2" /> Add Variant
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}