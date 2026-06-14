import { Shield, UserPlus, MoreVertical, Mail, Key, Lock } from "lucide-react";

const MOCK_ADMIN_USERS = [
    {
        id: "U-001",
        name: "Admin User",
        email: "admin@corely.vn",
        role: "Super Admin",
        lastLogin: "2 hours ago",
        status: "Active"
    },
    {
        id: "U-002",
        name: "Sales Manager",
        email: "sales@corely.vn",
        role: "Manager",
        lastLogin: "5 hours ago",
        status: "Active"
    },
    {
        id: "U-003",
        name: "Inventory Staff",
        email: "stock@corely.vn",
        role: "Staff",
        lastLogin: "Yesterday",
        status: "Active"
    }
];

export default function AdminUsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="headline-md text-on-surface">User Management & RBAC</h1>
                <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-primary-container transition-all">
                    <UserPlus className="h-4 w-4" />
                    Invite User
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {[
                    { label: "Super Admins", count: 2, icon: Shield, color: "text-primary" },
                    { label: "Managers", count: 5, icon: Key, color: "text-orange" },
                    { label: "Staff Members", count: 12, icon: Lock, color: "text-success" },
                ].map((role) => (
                    <div key={role.label} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 flex items-center gap-4">
                        <div className={`rounded-xl bg-surface-container-low p-3 ${role.color}`}>
                            <role.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-on-surface-variant">{role.label}</p>
                            <p className="text-2xl font-bold text-on-surface">{role.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-surface-container-low text-on-surface-variant font-medium">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Last Login</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {MOCK_ADMIN_USERS.map((user) => (
                                <tr key={user.id} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-on-surface">{user.name}</div>
                                                <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                                                    <Mail className="h-3 w-3" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${user.role === "Super Admin"
                                            ? "bg-primary/10 text-primary"
                                            : user.role === "Manager"
                                                ? "bg-orange/10 text-orange"
                                                : "bg-success/10 text-success"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-on-surface-variant">{user.lastLogin}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success">
                                            <div className="h-1.5 w-1.5 rounded-full bg-success" />
                                            {user.status}
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