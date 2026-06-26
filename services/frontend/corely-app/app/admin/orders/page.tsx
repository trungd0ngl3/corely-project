import { Search, Filter, MoreVertical, Eye, Truck, CheckCircle } from "lucide-react";

const MOCK_ADMIN_ORDERS = [
    {
        id: "CR-82931",
        customer: "Trung Dong Le",
        email: "trung@example.com",
        date: "2026-06-15",
        total: 45990000,
        status: "Processing",
        payment: "Paid"
    },
    {
        id: "CR-81042",
        customer: "Nguyen Van A",
        email: "nva@example.com",
        date: "2026-05-22",
        total: 12500000,
        status: "Shipped",
        payment: "Paid"
    },
    {
        id: "CR-80912",
        customer: "Tran Thi B",
        email: "ttb@example.com",
        date: "2026-05-20",
        total: 8900000,
        status: "Delivered",
        payment: "Paid"
    }
];

export default function AdminOrdersPage() {
    const formatPrice = (val: number) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="headline-md text-on-surface">Orders Management</h1>
                <div className="flex items-center gap-3">
                    <button className="flex h-10 items-center gap-2 rounded-lg border border-outline-variant px-4 text-sm font-medium text-on-surface hover:bg-surface-container-low">
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
                <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/50" />
                        <input
                            type="text"
                            placeholder="Search orders, customers..."
                            className="h-10 w-full rounded-lg border border-outline-variant bg-surface-container-low pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex h-10 items-center gap-2 rounded-lg border border-outline-variant px-4 text-sm font-medium text-on-surface hover:bg-surface-container-low">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-surface-container-low text-on-surface-variant font-medium">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {MOCK_ADMIN_ORDERS.map((order) => (
                                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-on-surface">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-on-surface">{order.customer}</div>
                                        <div className="text-xs text-on-surface-variant">{order.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-on-surface-variant">{order.date}</td>
                                    <td className="px-6 py-4 font-bold text-primary">{formatPrice(order.total)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${order.status === "Delivered"
                                            ? "bg-success/10 text-success"
                                            : order.status === "Shipped"
                                                ? "bg-blue-500/10 text-blue-500"
                                                : "bg-primary/10 text-primary"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                                            <CheckCircle className="h-3 w-3" />
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                                <Truck className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
                    <p>Showing 3 of 128 orders</p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container-low disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 rounded border border-outline-variant bg-primary text-white">1</button>
                        <button className="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container-low">2</button>
                        <button className="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container-low">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}