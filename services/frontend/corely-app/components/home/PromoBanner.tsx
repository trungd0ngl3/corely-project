import Image from "next/image";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
    return (
        <section className="py-16">
            <div className="container-max">
                <div className="relative overflow-hidden rounded-xl bg-on-surface px-8 py-16 md:px-16 md:py-24">
                    <div className="relative z-10 max-w-xl">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary-container">
                            Limited Time Offer
                        </span>
                        <h2 className="mt-4 text-headline-lg text-white md:text-display-lg">
                            ULTIMATE<br />
                            GAMING SETUP
                        </h2>
                        <p className="mt-6 text-body-lg text-surface-dim">
                            Save up to 30% on RTX Series Components and high-performance peripherals.
                        </p>
                        <div className="mt-10">
                            <Button size="lg" className="h-14 px-10 text-sm font-bold uppercase tracking-wider">
                                Shop Collection
                            </Button>
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/2 opacity-50 md:opacity-100">
                        <Image
                            src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop"
                            alt="Gaming Setup"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-on-surface via-on-surface/40 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}