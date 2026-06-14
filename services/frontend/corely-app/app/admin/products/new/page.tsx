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

export default function AdminNewProductPage() {
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
                    <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Publish
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">General Information</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Product Name</label>
                            <Input placeholder="e.g. CPU Intel Core i9-14900K" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Slug</label>
                            <Input placeholder="cpu-intel-core-i9-14900k" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Description</label>
                            <textarea
                                className="w-full min-h-[150px] p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                placeholder="Detailed product description..."
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">Media</h2>

                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                            <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                            <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                            <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {/* Image preview placeholders */}
                            <div className="aspect-square bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center">
                                <span className="text-xs text-slate-500">Main</span>
                            </div>
                            <div className="aspect-square bg-slate-50 rounded-md border border-dashed border-slate-300 flex items-center justify-center">
                                <Plus className="h-6 w-6 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-slate-900">Technical Specifications</h2>
                            <Button variant="outline" size="sm">Add Field</Button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                                <Input placeholder="Property e.g. Socket" className="flex-1" />
                                <Input placeholder="Value e.g. LGA1700" className="flex-1" />
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex gap-3 items-start">
                                <Input placeholder="Property e.g. Cores" className="flex-1" />
                                <Input placeholder="Value e.g. 24" className="flex-1" />
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">Pricing</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Regular Price (₫)</label>
                            <Input type="number" placeholder="0" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Sale Price (₫)</label>
                            <Input type="number" placeholder="0" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">Organization</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Category</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cpu">CPU</SelectItem>
                                    <SelectItem value="vga">VGA</SelectItem>
                                    <SelectItem value="mainboard">Mainboard</SelectItem>
                                    <SelectItem value="ram">RAM</SelectItem>
                                    <SelectItem value="ssd">SSD</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Brand</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="intel">Intel</SelectItem>
                                    <SelectItem value="amd">AMD</SelectItem>
                                    <SelectItem value="asus">ASUS</SelectItem>
                                    <SelectItem value="gigabyte">GIGABYTE</SelectItem>
                                    <SelectItem value="msi">MSI</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h2 className="text-lg font-medium text-slate-900">Inventory</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">SKU (Stock Keeping Unit)</label>
                            <Input placeholder="e.g. INT-14900K" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Stock Quantity</label>
                            <Input type="number" placeholder="0" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Warranty (Months)</label>
                            <Input type="number" placeholder="36" defaultValue="36" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
