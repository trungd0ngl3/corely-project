import { Search, AlertTriangle, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

const MOCK_INVENTORY = [
    {
        id: "P-001",
        name: "Intel Core i9-14900K",
        sku: "CPU-INT-14900K",
        stock: 5,
        minStock: 10,
        status: "Low Stock",
        location: "Warehouse A-12"
    },
    {
        id: "P-002",
        name: "ASUS ROG Maximus Z790 Hero",
        sku: "MB-ASU-Z790H",
        stock: 15,
        minStock: 5,
        status: "In Stock",
        location: "Warehouse B-04"
    },
    {
        id: "P-003",
        name: "NVIDIA RTX 4090 Founders Edition",
        sku: "GPU-NVI-4090FE",
        stock: 0,
        minStock: 5,
        status: "Out of Stock",
        location: "Warehouse A-01"
    }
];

export default function AdminInventoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="headline-md text-on-surface">Inventory Management</h1>
                <button className="flex h-10 items-center gap-2 rounded-lg border border-outline-variant px-4 text-sm font-medium text-on-surface hover:bg-surface-container-low">
                    <RefreshCw className="h-4 w-4" />
                    Sync Stock
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <p className="text-sm font-medium text-on-surface-variant mb-1">Total Items</p>
                    <p className="text-2xl font-bold text-on-surface">1,284</p>
                </div>
                <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <p className="text-sm font-medium text-on-surface-variant mb-1">Low Stock Alerts</p>
                    <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-error">12</p>
                        <AlertTriangle className="h-5 w-5 text-error" />
                    </div>
                </div>
                <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <p className="text-sm font-medium text-on-surface-variant mb-1">Out of Stock</p>
                    <p className="text-2xl font-bold text-on-surface-variant">5</p>
                </div>
            </div>

            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
                <div className="p-4 border-b border-outline-variant">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/50" />
                        <input
                            type="text"
                            placeholder="Search by name, SKU, or location..."
                            className="h-10 w-full rounded-lg border border-outline-variant bg-surface-container-low pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-surface-container-low text-on-surface-variant font-medium">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">SKU</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Stock Level</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {MOCK_INVENTORY.map((item) => (
                                <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-on-surface">{item.name}</td>
                                    <td className="px-6 py-4 text-on-surface-variant font-mono text-xs">{item.sku}</td>
                                    <td className="px-6 py-4 text-on-surface-variant">{item.location}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-on-surface">{item.stock}</span>
                                            <div className="h-1.5 w-24 rounded-full bg-surface-container-high overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${item.stock === 0
                                                        ? "bg-error"
                                                        : item.stock <= item.minStock
                                                            ? "bg-orange"
                                                            : "bg-success"
                                                        }`}
                                                    style={{ width: `${Math.min(100, (item.stock / 20) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${item.status === "In Stock"
                                            ? "bg-success/10 text-success"
                                            : item.status === "Low Stock"
                                                ? "bg-orange/10 text-orange"
                                                : "bg-error/10 text-error"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded transition-colors">
                                                <ArrowUpRight className="h-4 w-4" />
                                            </button>
                                            <button className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/5 rounded transition-colors">
                                                <ArrowDownRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}