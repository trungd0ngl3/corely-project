import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { getCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCartItem, removeFromCart as apiRemoveFromCart, clearCartApi, applyVoucher, removeVoucher, CartResponse } from "@/lib/api";

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
    serverCart: CartResponse | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchCart: () => Promise<void>;
    addItem: (product: Product, quantity?: number) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    applyCoupon: (code: string) => Promise<void>;
    removeCoupon: () => Promise<void>;

    // Getters
    totalItems: () => number;
    totalPrice: () => number;
    discount: () => number;
    finalPrice: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            serverCart: null,
            isLoading: false,
            error: null,

            fetchCart: async () => {
                set({ isLoading: true, error: null });
                try {
                    const cart = await getCart();

                    // Sync server cart to local items (simplified logic, assumes server is source of truth)
                    const localItems: CartItem[] = cart.items.map(item => ({
                        id: item.productId,
                        productId: item.productId,
                        name: item.productName,
                        price: item.price,
                        image: item.imageUrl || '',
                        quantity: item.quantity,
                        stock: item.availableStock,
                        product: {
                            id: item.productId,
                            name: item.productName,
                            price: item.price,
                            image: item.imageUrl || '',
                        }
                    }));

                    set({ serverCart: cart, items: localItems, isLoading: false });
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                }
            },

            addItem: async (product, quantity = 1) => {
                const prevItems = get().items;
                set({ isLoading: true, error: null });

                try {
                    // Optimistic update
                    const existingItem = prevItems.find((i) => i.productId === product.id);

                    if (existingItem) {
                        set({
                            items: prevItems.map((i) =>
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
                        set({ items: [...prevItems, newItem] });
                    }

                    // API call
                    await apiAddToCart(product.id, quantity);
                    await get().fetchCart();
                } catch (error: any) {
                    // Rollback
                    set({ items: prevItems, error: error.message, isLoading: false });
                }
            },

            removeItem: async (id) => {
                const prevItems = get().items;
                set({ isLoading: true, error: null });
                try {
                    // Optimistic
                    set({ items: prevItems.filter((i) => i.id !== id) });

                    // API call
                    await apiRemoveFromCart(id);
                    await get().fetchCart();
                } catch (error: any) {
                    // Rollback
                    set({ items: prevItems, error: error.message, isLoading: false });
                }
            },

            updateQuantity: async (id, quantity) => {
                const prevItems = get().items;
                set({ isLoading: true, error: null });
                try {
                    // Optimistic
                    set({
                        items: prevItems.map((i) =>
                            i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
                        ).filter(i => i.quantity > 0),
                    });

                    // API call
                    await apiUpdateCartItem(id, quantity);
                    await get().fetchCart();
                } catch (error: any) {
                    // Rollback
                    set({ items: prevItems, error: error.message, isLoading: false });
                }
            },

            clearCart: async () => {
                set({ isLoading: true, error: null });
                try {
                    set({ items: [] });
                    await clearCartApi();
                    await get().fetchCart();
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                }
            },

            applyCoupon: async (code: string) => {
                set({ isLoading: true, error: null });
                try {
                    await applyVoucher(code);
                    await get().fetchCart();
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                    throw error;
                }
            },

            removeCoupon: async () => {
                set({ isLoading: true, error: null });
                try {
                    await removeVoucher();
                    await get().fetchCart();
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                }
            },

            totalItems: () => get().serverCart?.totalItems || get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () => get().serverCart?.totalAmount || get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
            discount: () => get().serverCart?.discountAmount || 0,
            finalPrice: () => get().serverCart?.finalAmount || get().totalPrice(),
        }),
        {
            name: "corely-cart",
            partialize: (state) => ({ items: state.items }), // Only persist local items as fallback
        }
    )
);
