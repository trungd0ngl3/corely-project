import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";

export default function AdminAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="headline-md text-on-surface">Analytics & Reports</h1>
                <button className="flex h-10 items-center gap-2 rounded-lg border border-outline-variant px-4 text-sm font-medium text-on-surface hover:bg-surface-container-low">
                    <Download className="h-4 w-4" />
                    Download Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Revenue", value: "1.2B ₫", trend: "+12.5%", up: true, icon: DollarSign },
                    { label: "Total Orders", value: "1,284", trend: "+8.2%", up: true, icon: ShoppingBag },
                    { label: "New Customers", value: "452", trend: "-3.1%", up: false, icon: Users },
                    { label: "Conversion Rate", value: "3.2%", trend: "+1.4%", up: true, icon: TrendingUp },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="rounded-xl bg-primary/10 p-2 text-primary">
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? "text-success" : "text-error"}`}>
                                {stat.trend}
                                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            </div>
                        </div>
                        <p className="text-sm font-medium text-on-surface-variant mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-on-surface">Revenue Overview</h3>
                        <select className="text-xs font-medium bg-surface-container-low border-none rounded-lg px-2 py-1 focus:ring-0">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <RevenueChart />
                    </div>
                </div>

                <div className="lg:col-span-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                    <h3 className="font-bold text-on-surface mb-6">Top Categories</h3>
                    <div className="space-y-6">
                        {[
                            { label: "Processors (CPU)", value: 45, color: "bg-primary" },
                            { label: "Graphics Cards (GPU)", value: 32, color: "bg-blue-400" },
                            { label: "Motherboards", value: 15, color: "bg-orange" },
                            { label: "Storage", value: 8, color: "bg-success" },
                        ].map((cat) => (
                            <div key={cat.label} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-on-surface-variant">{cat.label}</span>
                                    <span className="font-bold text-on-surface">{cat.value}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-surface-container-high overflow-hidden">
                                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}