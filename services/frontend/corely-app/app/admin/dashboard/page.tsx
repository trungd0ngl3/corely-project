import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">
                    {"Overview of your store's performance."}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
                        <DollarSign className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24.500.000₫</div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                            <ArrowUp className="h-3 w-3 text-emerald-500 mr-1" />
                            <span className="text-emerald-500 font-medium mr-1">+15%</span>
                            from yesterday
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">42</div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                            <ArrowUp className="h-3 w-3 text-emerald-500 mr-1" />
                            <span className="text-emerald-500 font-medium mr-1">+8%</span>
                            from yesterday
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,254</div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                            <span className="text-slate-500 font-medium mr-1">+12</span>
                            new this week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customers</CardTitle>
                        <Users className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5,820</div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                            <ArrowUp className="h-3 w-3 text-emerald-500 mr-1" />
                            <span className="text-emerald-500 font-medium mr-1">+180</span>
                            since last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                <div className="lg:col-span-4">
                    <RevenueChart />
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-lg text-slate-800">Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { id: "ORD-7829", customer: "Nguyen Van A", amount: "12.500.000₫", status: "Processing", date: "10 mins ago" },
                                    { id: "ORD-7828", customer: "Tran Thi B", amount: "4.200.000₫", status: "Paid", date: "1 hour ago" },
                                    { id: "ORD-7827", customer: "Le Van C", amount: "35.000.000₫", status: "Pending", date: "3 hours ago" },
                                    { id: "ORD-7826", customer: "Pham D", amount: "1.500.000₫", status: "Delivered", date: "5 hours ago" },
                                    { id: "ORD-7825", customer: "Hoang E", amount: "8.900.000₫", status: "Shipping", date: "Yesterday" },
                                ].map((order) => (
                                    <div key={order.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{order.id}</p>
                                            <p className="text-xs text-slate-500">{order.customer}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-slate-900">{order.amount}</p>
                                            <p className="text-xs text-slate-500">{order.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-lg text-slate-800">Low Stock Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "VGA GIGABYTE GeForce RTX 5080 GAMING OC 16G", stock: 2, price: "35.990.000₫" },
                                { name: "CPU Intel Core i7-14700K", stock: 1, price: "10.490.000₫" },
                                { name: "Mainboard ASUS ROG MAXIMUS Z790 HERO", stock: 3, price: "16.990.000₫" },
                            ].map((product, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                                        <p className="text-xs text-slate-500">{product.price}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                            Only {product.stock} left
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}