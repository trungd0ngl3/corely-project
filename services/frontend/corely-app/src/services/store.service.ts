import api from "@/lib/axios";
import { StoreResponse } from "@/types/store";
import { ApiResponse } from "@/types/api";

export const StoreService = {
    getStores: async () => {
        const res = await api.get<ApiResponse<StoreResponse[]>>("/api/v1/store");
        return res.data;
    },
    getStoreById: async (id: string) => {
        const res = await api.get<ApiResponse<StoreResponse>>(`/api/v1/store/${id}`);
        return res.data;
    }
};