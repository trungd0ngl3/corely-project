import api from "@/lib/axios";

export const AdminService = {
    getDashboardStats: async () => {
        return await api.get("/api/v1/admin/dashboard");
    },
    getUsers: async () => {
        return await api.get("/api/v1/admin/users");
    },
    deleteUser: async (id: string) => {
        return await api.delete(`/api/v1/admin/users/${id}`);
    }
};