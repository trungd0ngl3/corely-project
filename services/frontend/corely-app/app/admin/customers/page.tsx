import { Search, Filter, MoreVertical, Mail, Phone, UserPlus } from "lucide-react";

const MOCK_CUSTOMERS = [
    {
        id: "C-1001",
        name: "Trung Dong Le",
        email: "trung@example.com",
        phone: "0901234567",
        orders: 12,
        spent: 154200000,
        status: "Active"
    },
    {
        id: "C-1002",
        name: "Nguyen Van A",
        email: "nva@example.com",
        phone: "0912345678",
        orders: 5,
        spent: 45000000,
        status: "Active"
    },
    {
        id: "C-1003",
        name: "Tran Thi B",
        email: "ttb@example.com",
        phone: "0923456789",
        orders: 2,
        spent: 12500000,
        status: "Inactive"
    }
];

export default function AdminCustomersPage() {
    const formatPrice = (val: number) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="headline-md text-on-surface">Customers</h1>
                <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-primary-container transition-all">
                    <UserPlus className="h-4 w-4" />
                    Add Customer
                </button>
            </div>

            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
                <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/50" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="h-10 w-full rounded-lg border border-outline-variant bg-surface-container-low pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
                        />
                    </div>
                    <button className="flex h-10 items-center gap-2 rounded-lg border border-outline-variant px-4 text-sm font-medium text-on-surface hover:bg-surface-container-low">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-surface-container-low text-on-surface-variant font-medium">
                            <tr>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Orders</th>
                                <th className="px-6 py-4">Total Spent</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {MOCK_CUSTOMERS.map((customer) => (
                                <tr key={customer.id} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-on-surface">{customer.name}</div>
                                                <div className="text-xs text-on-surface-variant">{customer.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-on-surface-variant">
                                                <Mail className="h-3 w-3" />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-on-surface-variant">
                                                <Phone className="h-3 w-3" />
                                                {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-on-surface">{customer.orders}</td>
                                    <td className="px-6 py-4 font-bold text-primary">{formatPrice(customer.spent)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${customer.status === "Active"
                                            ? "bg-success/10 text-success"
                                            : "bg-on-surface-variant/10 text-on-surface-variant"
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors">
                                            <MoreVertical className="h-4 w-4" />
                                        </button>
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