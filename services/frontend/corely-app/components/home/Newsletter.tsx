import { Button } from "@/components/ui/button";

export function Newsletter() {
    return (
        <section className="py-16">
            <div className="container-max">
                <div className="relative overflow-hidden rounded-3xl bg-primary-container px-8 py-16 text-center md:px-16 md:py-20">
                    <div className="relative z-10 mx-auto max-w-2xl">
                        <h2 className="text-headline-lg font-bold text-white">
                            STAY UPDATED
                        </h2>
                        <p className="mt-4 text-body-lg text-white/80">
                            Get exclusive offers, new product announcements, and expert PC building tips delivered to your inbox.
                        </p>
                        <form className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="h-14 flex-1 rounded-full border-none bg-white px-8 text-sm text-on-surface outline-none focus:ring-4 focus:ring-white/20"
                                required
                            />
                            <Button
                                type="submit"
                                size="lg"
                                className="h-14 bg-on-surface px-10 text-sm font-bold uppercase tracking-wider text-white hover:bg-on-surface/90"
                            >
                                Subscribe
                            </Button>
                        </form>
                        <p className="mt-6 text-xs text-white/60">
                            By subscribing, you agree to our Privacy Policy and Terms of Service.
                        </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                </div>
            </div>
        </section>
    );
}