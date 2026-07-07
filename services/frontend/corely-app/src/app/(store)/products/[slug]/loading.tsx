export default function ProductDetailLoading() {
    return (
        <div className="min-h-screen bg-surface pb-24">
            <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
                {/* Breadcrumb Skeleton */}
                <div className="mb-6 h-4 w-64 animate-pulse rounded bg-surface-container-high" />

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Gallery Skeleton */}
                    <div className="space-y-4">
                        <div className="aspect-square w-full animate-pulse rounded-2xl bg-surface-container-high" />
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="aspect-square w-full animate-pulse rounded-xl bg-surface-container-high"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Info Skeleton */}
                    <div className="flex flex-col gap-6">
                        <div className="space-y-3">
                            <div className="h-6 w-20 animate-pulse rounded bg-surface-container-high" />
                            <div className="h-10 w-full animate-pulse rounded bg-surface-container-high" />
                            <div className="h-10 w-3/4 animate-pulse rounded bg-surface-container-high" />
                            <div className="h-6 w-40 animate-pulse rounded bg-surface-container-high" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-12 w-48 animate-pulse rounded bg-surface-container-high" />
                            <div className="h-6 w-32 animate-pulse rounded bg-surface-container-high" />
                        </div>

                        <div className="space-y-4">
                            <div className="h-12 w-32 animate-pulse rounded-xl bg-surface-container-high" />
                            <div className="flex gap-3">
                                <div className="h-14 flex-1 animate-pulse rounded-xl bg-surface-container-high" />
                                <div className="h-14 flex-1 animate-pulse rounded-xl bg-surface-container-high" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}