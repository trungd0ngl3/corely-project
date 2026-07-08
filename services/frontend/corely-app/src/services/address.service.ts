import api from "@/lib/axios";
import { AddressRequest, AddressResponse } from "@/types/address";

export const AddressService = {
    getMyAddresses: async () => {
        return await api.get<AddressResponse[]>("/api/v1/addresses");
    },
    createAddress: async (data: AddressRequest) => {
        return await api.post<AddressResponse>("/api/v1/addresses", data);
    },
    updateAddress: async (id: string, data: AddressRequest) => {
        return await api.put<AddressResponse>(`/api/v1/addresses/${id}`, data);
    },
    deleteAddress: async (id: string) => {
        return await api.delete(`/api/v1/addresses/${id}`);
    },
    setDefault: async (id: string) => {
        return await api.patch(`/api/v1/addresses/${id}/default`);
    }
};