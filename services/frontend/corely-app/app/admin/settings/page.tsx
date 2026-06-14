import { Save, Globe, Bell, Shield, CreditCard, Truck, Mail } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="headline-md text-on-surface">System Settings</h1>
                <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white hover:bg-primary-container transition-all">
                    <Save className="h-4 w-4" />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3">
                    <nav className="space-y-1">
                        {[
                            { icon: Globe, label: "General", active: true },
                            { icon: Bell, label: "Notifications", active: false },
                            { icon: Shield, label: "Security", active: false },
                            { icon: CreditCard, label: "Payments", active: false },
                            { icon: Truck, label: "Shipping", active: false },
                            { icon: Mail, label: "Email Templates", active: false },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${item.active
                                    ? "bg-primary/10 text-primary"
                                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-9 space-y-6">
                    <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                        <h3 className="text-lg font-bold text-on-surface mb-6">Store Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-on-surface-variant">Store Name</label>
                                <input
                                    type="text"
                                    defaultValue="Corely High-Performance Computing"
                                    className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 text-sm focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-on-surface-variant">Store Email</label>
                                <input
                                    type="email"
                                    defaultValue="contact@corely.vn"
                                    className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 text-sm focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-on-surface-variant">Store Address</label>
                                <textarea
                                    rows={3}
                                    defaultValue="123 Tech Street, District 1, Ho Chi Minh City, Vietnam"
                                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low p-4 text-sm focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                        <h3 className="text-lg font-bold text-on-surface mb-6">Localization</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-on-surface-variant">Default Currency</label>
                                <select className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 text-sm focus:border-primary focus:outline-none">
                                    <option>VND (₫)</option>
                                    <option>USD ($)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-on-surface-variant">Timezone</label>
                                <select className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 text-sm focus:border-primary focus:outline-none">
                                    <option>(GMT+07:00) Ho Chi Minh</option>
                                    <option>(GMT+00:00) UTC</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
                        <h3 className="text-lg font-bold text-on-surface mb-6">Maintenance Mode</h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-on-surface">Enable Maintenance Mode</p>
                                <p className="text-sm text-on-surface-variant">Disable the storefront for customers while performing updates.</p>
                            </div>
                            <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-surface-container-high transition-colors duration-200 ease-in-out focus:outline-none">
                                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}