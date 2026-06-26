import { Product } from "@/store/use-cart";

export interface WishlistItem {
    id: string;
    product: Product;
    addedAt: string;
}