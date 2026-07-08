import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative h-[600px] w-full overflow-hidden bg-gradient-to-br from-[#F8F9FF] to-[#DCE9FF]">
            <div className="container-max relative z-10 flex h-full items-center">
                <div className="max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary-container">
                        High Performance Computing
                    </span>
                    <h1 className="mt-4 text-display-lg text-on-surface">
                        BUILD YOUR<br />
                        <span className="text-primary-container">DREAM PC</span>
                    </h1>
                    <p className="mt-6 text-body-lg text-on-surface-variant">
                        High Performance Components for Gaming & Workstation.<br />
                        Engineered for precision, power, and dependability.
                    </p>
                    <div className="mt-10 flex gap-4">
                        <Button size="lg" className="h-14 px-10 text-sm font-bold uppercase tracking-wider">
                            Shop Now
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-10 text-sm font-bold uppercase tracking-wider">
                            Explore Builds
                        </Button>
                    </div>
                </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2">
                <Image
                    src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop"
                    alt="Gaming PC Components"
                    fill
                    className="object-contain object-right p-12"
                    priority
                />
            </div>
        </section>
    );
}