"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Tags,
    Award,
    ShoppingCart,
    Ticket,
    Users,
    MessageSquare,
    Box,
    Warehouse,
    Cpu,
    Link as LinkIcon,
    CreditCard,
    DollarSign,
    UserCog,
    Shield,
    Settings,
    ChevronDown,
    ChevronRight
} from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
        name: "Catalog",
        icon: Package,
        children: [
            { name: "Products", href: "/admin/products", icon: Package },
            { name: "Categories", href: "/admin/categories", icon: Tags },
            { name: "Brands", href: "/admin/brands", icon: Award },
        ]
    },
    {
        name: "Sales",
        icon: ShoppingCart,
        children: [
            { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
            { name: "Coupons", href: "/admin/coupons", icon: Ticket },
        ]
    },
    {
        name: "Customers",
        icon: Users,
        children: [
            { name: "Customers", href: "/admin/customers", icon: Users },
            { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
        ]
    },
    {
        name: "Inventory",
        icon: Box,
        children: [
            { name: "Stock", href: "/admin/inventory", icon: Box },
            { name: "Warehouses", href: "/admin/inventory/warehouses", icon: Warehouse },
        ]
    },
    {
        name: "PC Builder",
        icon: Cpu,
        children: [
            { name: "Components", href: "/admin/pc-builder", icon: Cpu },
            { name: "Compatibility Rules", href: "/admin/pc-builder/rules", icon: LinkIcon },
        ]
    },
    {
        name: "Finance",
        icon: DollarSign,
        children: [
            { name: "Payments", href: "/admin/payments", icon: CreditCard },
            { name: "Revenue", href: "/admin/analytics", icon: DollarSign },
        ]
    },
    {
        name: "System",
        icon: Settings,
        children: [
            { name: "Users", href: "/admin/users", icon: UserCog },
            { name: "Roles", href: "/admin/roles", icon: Shield },
            { name: "Settings", href: "/admin/settings", icon: Settings },
        ]
    }
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
        "Catalog": true,
    });

    const toggleGroup = (name: string) => {
        setOpenGroups(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const isActive = (href: string) => pathname.startsWith(href);

    return (
        <div className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 h-full flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <Link href="/admin/dashboard" className="text-xl font-bold text-white tracking-tight">
                    CORELY<span className="text-blue-500">ADMIN</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                <nav className="space-y-1 px-3">
                    {navigation.map((item) => {
                        if (!item.children) {
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group ${isActive(item.href)
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                                    {item.name}
                                </Link>
                            );
                        }

                        const isGroupActive = item.children.some(child => isActive(child.href));
                        const isOpen = openGroups[item.name] || isGroupActive;

                        return (
                            <div key={item.name} className="space-y-1">
                                <button
                                    onClick={() => toggleGroup(item.name)}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md group ${isGroupActive ? "text-white" : "hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <item.icon className={`mr-3 h-5 w-5 ${isGroupActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                                        {item.name}
                                    </div>
                                    {isOpen ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="space-y-1 pl-10">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={`block px-3 py-2 text-sm font-medium rounded-md ${pathname === child.href || pathname.startsWith(child.href + '/')
                                                        ? "bg-slate-800 text-blue-400"
                                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                                    }`}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}