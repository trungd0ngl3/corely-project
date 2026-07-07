import { Truck, Zap, ShieldCheck, MessageSquare } from "lucide-react";

const FEATURES = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "On all orders over $500",
    },
    {
        icon: Zap,
        title: "Fast Delivery",
        description: "24h shipping on components",
    },
    {
        icon: ShieldCheck,
        title: "Genuine Products",
        description: "100% authentic hardware",
    },
    {
        icon: MessageSquare,
        title: "24/7 Support",
        description: "Expert technical assistance",
    },
];

export function WhyChooseUs() {
    return (
        <section className="py-16 bg-surface">
            <div className="container-max">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map((feature) => (
                        <div
                            key={feature.title}
                            className="flex flex-col items-center text-center p-8 rounded-2xl bg-surface-container-lowest shadow-level-1"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/10 text-primary-container mb-6">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-bold text-on-surface mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-on-surface-variant">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}