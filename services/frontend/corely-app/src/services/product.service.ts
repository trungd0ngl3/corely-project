import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { ProductResponse, PageProductResponse } from "@/types/product";

export interface ProductFilter {
    page?: number;
    size?: number;
    sort?: string;
}

export const ProductService = {
    getProducts: async (params: ProductFilter) => {
        const res = await api.get<PageProductResponse>("/api/v1/products", {
            params,
        });
        return res.data;
    },

    getProductBySlug: async (slug: string) => {
        const res = await api.get<ApiResponse<ProductResponse>>(
            `/api/v1/products/${slug}`
        );
        return res.data;
    },

    getActiveProducts: async () => {
        const res = await api.get<PageProductResponse>("/api/v1/products");

        return res.data;
    },

    createProduct: async (data: any) => {
        const res = await api.post("/api/v1/products", data);
        return res.data;
    }
};
