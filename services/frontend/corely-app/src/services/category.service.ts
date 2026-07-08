import api from "@/lib/axios";
import { CategoryResponse } from "@/types/category";

export const CategoryService = {
    getCategories: async () => {
        return await api.get<CategoryResponse[]>("/api/v1/categories");
    },
    getCategoryBySlug: async (slug: string) => {
        return await api.get<CategoryResponse>(`/api/v1/categories/${slug}`);
    }
};