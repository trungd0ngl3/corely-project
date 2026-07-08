import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { CartService } from "@/services/cart.service";
import { CartResponse } from "@/types/cart";

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
                    const { data: cart } = await CartService.getCart();

                    const localItems: CartItem[] = cart.items.map((item: { productId: string; productName: string; price: number; imageUrl?: string; quantity: number; availableStock?: number }) => ({
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
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    if (axios.isAxiosError(error)) toast.error(error.response?.data?.message || message);
                    set({ error: message, isLoading: false });
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
                    await CartService.addToCart({ productId: product.id, quantity });
                    await get().fetchCart();
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    if (axios.isAxiosError(error)) toast.error(error.response?.data?.message || message);
                    // Rollback
                    set({ items: prevItems, error: message, isLoading: false });
                }
            },

            removeItem: async (id) => {
                const prevItems = get().items;
                set({ isLoading: true, error: null });
                try {
                    // Optimistic
                    set({ items: prevItems.filter((i) => i.id !== id) });

                    // API call
                    await CartService.removeFromCart(id);
                    await get().fetchCart();
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    if (axios.isAxiosError(error)) toast.error(error.response?.data?.message || message);
                    // Rollback
                    set({ items: prevItems, error: message, isLoading: false });
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
                    await CartService.updateCartItem({ productId: id, quantity });
                    await get().fetchCart();
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    if (axios.isAxiosError(error)) toast.error(error.response?.data?.message || message);
                    // Rollback
                    set({ items: prevItems, error: message, isLoading: false });
                }
            },

            clearCart: async () => {
                set({ isLoading: true, error: null });
                try {
                    set({ items: [] });
                    await CartService.clearCart();
                    await get().fetchCart();
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    if (axios.isAxiosError(error)) toast.error(error.response?.data?.message || message);
                    set({ error: message, isLoading: false });
                }
            },

            applyCoupon: async (code: string) => {
                set({ isLoading: true, error: null });
                try {
                    await CartService.applyVoucher({ voucherCode: code });
                    await get().fetchCart();
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    if (axios.isAxiosError(error)) toast.error(error.response?.data?.message || message);
                    set({ error: message, isLoading: false });
                    throw error;
                }
            },

            removeCoupon: async () => {
                set({ isLoading: true, error: null });
                try {
                    await CartService.removeVoucher();
                    await get().fetchCart();
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    if (axios.isAxiosError(error)) toast.error(error.response?.data?.message || message);
                    set({ error: message, isLoading: false });
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
