export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-8">
                <div className="h-12 w-full animate-pulse rounded-full bg-surface-container" />
                <div className="flex gap-8">
                    <div className="hidden w-80 shrink-0 lg:block">
                        <div className="h-[600px] w-full animate-pulse rounded-2xl bg-surface-container" />
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="aspect-[3/4] w-full animate-pulse rounded-2xl bg-surface-container" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}