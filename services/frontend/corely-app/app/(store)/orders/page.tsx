import { Package, ChevronRight, Search, Filter } from "lucide-react";
import Link from "next/link";

const MOCK_ORDERS = [
    {
        id: "CR-82931",
        date: "June 15, 2026",
        total: 45990000,
        status: "Processing",
        items: [
            { name: "Intel Core i9-14900K", quantity: 1, price: 15490000 },
            { name: "ASUS ROG Maximus Z790 Hero", quantity: 1, price: 18500000 }
        ]
    },
    {
        id: "CR-81042",
        date: "May 22, 2026",
        total: 12500000,
        status: "Delivered",
        items: [
            { name: "Samsung 990 Pro 2TB", quantity: 2, price: 6250000 }
        ]
    }
];

export default function OrdersPage() {
    const formatPrice = (val: number) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

    return (
        <div className="bg-surface min-h-screen py-12">
            <div className="container-max">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="headline-lg text-on-surface mb-2">Order History</h1>
                        <p className="text-on-surface-variant">Manage and track your recent orders.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/50" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="h-11 w-full md:w-64 rounded-xl border border-outline-variant bg-surface-container-lowest pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
                            />
                        </div>
                        <button className="flex h-11 items-center gap-2 rounded-xl border border-outline-variant px-4 text-sm font-medium text-on-surface hover:bg-surface-container-low">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {MOCK_ORDERS.map((order) => (
                        <div
                            key={order.id}
                            className="group overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest transition-all hover:border-primary/30 hover:shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-outline-variant bg-surface-container-low/30 px-6 py-4 gap-4">
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">Order ID</p>
                                        <p className="text-sm font-bold text-on-surface">{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">Date Placed</p>
                                        <p className="text-sm font-medium text-on-surface">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">Total Amount</p>
                                        <p className="text-sm font-bold text-primary">{formatPrice(order.total)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${order.status === "Delivered"
                                        ? "bg-success/10 text-success"
                                        : "bg-primary/10 text-primary"
                                        }`}>
                                        {order.status}
                                    </span>
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                                    >
                                        Details
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="px-6 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3 overflow-hidden">
                                        {order.items.map((_, i) => (
                                            <div key={i} className="inline-block h-12 w-12 rounded-xl border-2 border-surface-container-lowest bg-surface-container-low flex items-center justify-center">
                                                <Package className="h-6 w-6 text-on-surface-variant/40" />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-on-surface">
                                            {order.items[0].name}
                                            {order.items.length > 1 && ` + ${order.items.length - 1} more items`}
                                        </p>
                                        <p className="text-xs text-on-surface-variant">
                                            {order.items.reduce((acc, item) => acc + item.quantity, 0)} items total
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}