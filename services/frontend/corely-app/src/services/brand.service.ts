import api from "@/lib/axios";
import { BrandResponse, BrandRequest } from "@/types/brand";

export const BrandService = {
    getBrands: async () => {
        return await api.get<BrandResponse[]>("/api/v1/brands");
    },
    getBrandBySlug: async (slug: string) => {
        return await api.get<BrandResponse>(`/api/v1/brands/${slug}`);
    },
    createBrand: async (data: BrandRequest) => {
        return await api.post("/api/v1/brands", data);
    },
    deleteBrand: async (id: string) => {
        return await api.delete(`/api/v1/brands/${id}`);
    }
};
