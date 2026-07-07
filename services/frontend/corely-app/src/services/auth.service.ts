import api from "@/lib/axios";
import { LoginResult, User } from "@/types/auth";

export const AuthService = {
    login: async (email: string, password: string, rememberMe?: boolean) => {
        return api.post<LoginResult>("/api/auth/login", { email, password, rememberMe });
    },
    register: async (data: any) => {
        return api.post("/api/auth/register", data);
    },
    getMe: async (token?: string) => {
        return api.get<User>("/api/v1/users/myinfo", {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
    },
    refreshToken: async (refreshToken: string) => {
        return api.post<LoginResult>("/api/auth/refresh", { refreshToken });
    },
    logout: () => api.post("/api/auth/logout"),
};