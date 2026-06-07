import Image from "next/image";
import { BRANDS } from "@/lib/mock-data";

export function BrandSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container-max">
                <div className="grid grid-cols-2 gap-8 grayscale opacity-50 sm:grid-cols-4 lg:grid-cols-8">
                    {BRANDS.map((brand) => (
                        <div
                            key={brand.name}
                            className="flex items-center justify-center transition-all hover:grayscale-0 hover:opacity-100"
                        >
                            <div className="relative h-8 w-24">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}