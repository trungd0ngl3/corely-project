"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical, Eye, Truck, CheckCircle } from "lucide-react";
import { OrderService } from "@/services/order.service";
import { StoreService } from "@/services/store.service";
import { UpdateOrderStatusRequest } from "@/types/order";
import { OrderResponse } from "@/types/order";

const getNextStatus = (
    status: OrderResponse["status"]
): UpdateOrderStatusRequest["status"] | null => {
    switch (status) {
        case "PENDING": return "CONFIRMED";
        case "CONFIRMED": return "PROCESSING";
        case "PROCESSING": return "SHIPPED";
        case "SHIPPED": return "DELIVERED";
        default: return null;
    }
};

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

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        StoreService.getStores()
            .then((store: any) => {
                console.log("Store:", store);

                const storeId = store.id;

                console.log("storeId =", storeId);

                if (storeId) {
                    OrderService.getStoreOrder(storeId, {
                        page: 0,
                        size: 10,
                    }).then((oRes: any) => {
                        console.log("Order response:", oRes);

                        setOrders(oRes.content || []);
                    });
                }
            })
            .catch(console.error);
    }, []);

    const updateStatus = async (
        id: string,
        status: UpdateOrderStatusRequest["status"]
    ) => {
        try {
            await OrderService.updateOrderStatus(id, { status });
            setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
        } catch (e) {
            console.error(e);
            alert("Cập nhật thất bại.");
        }
    };


    const formatPrice = (val: number) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

    const viewDetails = (id: string) => {
        window.location.href = `/admin/orders/${id}`;
    };

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
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-on-surface">{order.orderCode}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-on-surface">{order.userId}</div>
                                    </td>
                                    <td className="px-6 py-4 text-on-surface-variant">{new Date(order.createdAt).toLocaleString("vi-VN")}</td>
                                    <td className="px-6 py-4 font-bold text-primary">{formatPrice(order.totalAmount)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor[order.status as OrderResponse["status"]]}`}>
                                            {statusText[order.status as OrderResponse["status"]]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs font-medium text-on-surface">{order.paymentMethod}</div>
                                        <div className="text-xs text-on-surface-variant">{order.paymentStatus}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => viewDetails(order.id)}
                                                className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            {(() => {
                                                const next = getNextStatus(order.status);
                                                return next ? (
                                                    <button
                                                        onClick={() => updateStatus(order.id, next)}
                                                        className="rounded-lg bg-primary px-3 py-1 text-xs text-white hover:opacity-90"
                                                    >
                                                        {next}
                                                    </button>
                                                ) : null;
                                            })()}
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