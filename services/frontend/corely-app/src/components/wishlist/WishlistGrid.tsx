import { useWishlistStore } from "@/hooks/use-wishlist";
import { ProductCard } from "@/components/ui/product-card";

export function WishlistGrid() {
    const { items, isLoading } = useWishlistStore();

    if (isLoading) return <div>Loading...</div>;
    if (!items?.length) return <div>Wishlist empty.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <ProductCard
                    key={item.product.id}
                    id={item.product.id}
                    slug={item.product.id}
                    name={item.product.name}
                    price={item.product.price}
                    image={item.product.image}
                    brand={item.product.brand || ""}
                />
            ))}
        </div>
    );
}
