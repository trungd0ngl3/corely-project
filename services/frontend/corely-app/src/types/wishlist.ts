import { Product } from "@/hooks/use-cart";

export interface WishlistItem {
    id: string;
    product: Product;
    addedAt: string;
}