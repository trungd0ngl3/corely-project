import { Plus, Tag, Calendar, Clock, MoreVertical, Edit2, Trash2 } from "lucide-react";

const MOCK_PROMOTIONS = [
    {
        id: "PROM-001",
        name: "Summer Sale 2026",
        code: "SUMMER26",
        discount: "15% OFF",
        status: "Active",
        period: "Jun 01 - Aug 31, 2026",
        usage: "124/500"
    },
    {
        id: "PROM-002",
        name: "New User Welcome",
        code: "WELCOME10",
        discount: "10% OFF",
        status: "Active",
        period: "Permanent",
        usage: "856"
    },
    {
        id: "PROM-003",
        name: "Flash Sale - RTX 4090",
        code: "FLASH4090",
        discount: "2,000,000 VND",
        status: "Expired",
        period: "Jun 10 - Jun 12, 2026",
        usage: "50/50"
    }
];

export default function AdminPromotionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="headline-md text-on-surface">Promotions & Coupons</h1>
                <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-primary-container transition-all">
                    <Plus className="h-4 w-4" />
                    Create Promotion
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PROMOTIONS.map((promo) => (
                    <div
                        key={promo.id}
                        className="group relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 transition-all hover:border-primary/30 hover:shadow-md"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <Tag className="h-6 w-6" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${promo.status === "Active"
                                    ? "bg-success/10 text-success"
                                    : "bg-on-surface-variant/10 text-on-surface-variant"
                                    }`}>
                                    {promo.status}
                                </span>
                                <button className="p-1 text-on-surface-variant hover:text-on-surface">
                                    <MoreVertical className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="mb-1 font-bold text-on-surface">{promo.name}</h3>
                        <div className="mb-4 inline-block rounded-lg bg-surface-container-low px-3 py-1 font-mono text-sm font-bold text-primary">
                            {promo.code}
                        </div>

                        <div className="mb-6 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                                <Clock className="h-3.5 w-3.5" />
                                {promo.discount}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                                <Calendar className="h-3.5 w-3.5" />
                                {promo.period}
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-outline-variant pt-4">
                            <div className="text-xs text-on-surface-variant">
                                Usage: <span className="font-bold text-on-surface">{promo.usage}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors">
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button className="rounded-lg p-2 text-on-surface-variant hover:bg-error/5 hover:text-error transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}