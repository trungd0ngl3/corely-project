import { apiFetch } from "@/lib/api-server";
import { PageProductResponse, Product } from "@/types/product";

export const ProductService = {
    getActiveProducts: async (page = 0, size = 20, sortBy = "createdAt", sortDir = "DESC") => {
        const params = new URLSearchParams({ page: String(page), size: String(size), sortBy, sortDir });
        return await apiFetch<PageProductResponse>(`/products?${params.toString()}`);
    },
    getProductBySlug: async (slug: string) => {
        return await apiFetch<Product>(`/products/${slug}`);
    },
};
