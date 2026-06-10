interface ProductPriceProps {
    price: number;
    originalPrice: number;
    stock: number;
}

export function ProductPrice({ price, originalPrice, stock }: ProductPriceProps) {
    const formatPrice = (val: number) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                    {formatPrice(price)}
                </span>
                <span className="text-lg text-on-surface-variant/40 line-through">
                    {formatPrice(originalPrice)}
                </span>
                <span className="rounded-full bg-orange/10 px-3 py-1 text-sm font-bold text-orange">
                    -{discount}%
                </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                {stock > 0 ? (
                    <>
                        <span className="flex items-center gap-1 font-semibold text-success">
                            <span className="inline-block h-2 w-2 rounded-full bg-success" />
                            In Stock
                        </span>
                        {stock <= 10 && (
                            <span className="text-on-surface-variant/60">
                                — Only {stock} left
                            </span>
                        )}
                    </>
                ) : (
                    <span className="font-semibold text-error">Out of Stock</span>
                )}
            </div>
        </div>
    );
}