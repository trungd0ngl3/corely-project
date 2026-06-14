import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    brand?: string;
    sku?: string;
    stock?: number;
    category?: string;
}

export interface CartItem {
    id: string; // Used as cart item ID, usually same as productId
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    brand?: string;
    sku?: string;
    stock?: number;
    category?: string;
    product: Product;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.productId === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i.productId === product.id
                                ? { ...i, quantity: i.quantity + quantity }
                                : i
                        ),
                    });
                } else {
                    const newItem: CartItem = {
                        id: product.id,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: quantity,
                        brand: product.brand,
                        sku: product.sku || `SKU-${product.id}`,
                        stock: product.stock || 10,
                        category: product.category,
                        product: product
                    };
                    set({ items: [...currentItems, newItem] });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },
            updateQuantity: (id, quantity) => {
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
                    ).filter(i => i.quantity > 0),
                });
            },
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: "corely-cart",
        }
    )
);