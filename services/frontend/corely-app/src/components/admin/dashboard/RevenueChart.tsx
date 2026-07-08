"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { date: "01/05", revenue: 12000000 },
    { date: "02/05", revenue: 18000000 },
    { date: "03/05", revenue: 15000000 },
    { date: "04/05", revenue: 25000000 },
    { date: "05/05", revenue: 22000000 },
    { date: "06/05", revenue: 30000000 },
    { date: "07/05", revenue: 28000000 },
    { date: "08/05", revenue: 35000000 },
    { date: "09/05", revenue: 42000000 },
    { date: "10/05", revenue: 38000000 },
    { date: "11/05", revenue: 45000000 },
    { date: "12/05", revenue: 50000000 },
    { date: "13/05", revenue: 48000000 },
    { date: "14/05", revenue: 55000000 },
];

export default function RevenueChart() {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <Card className="col-span-1 lg:col-span-4 shadow-sm border-slate-200">
            <CardHeader>
                <CardTitle className="text-lg text-slate-800">Revenue Overview</CardTitle>
                <CardDescription>Daily revenue for the last 14 days</CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#64748b" }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#64748b" }}
                                tickFormatter={(value) => {
                                    if (value === 0) return "0";
                                    return `${(value / 1000000).toFixed(0)}M`;
                                }}
                                width={60}
                            />
                            <Tooltip
                                formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
                                labelStyle={{ color: "#0f172a", fontWeight: "bold", marginBottom: "4px" }}
                                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                                activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}