import api from "@/lib/axios";

export const loginApi = (email: string, password: string, rememberMe?: boolean) => {
    return api.post("/api/auth/login", { email, password, rememberMe });
};

export const getMeApi = (token?: string) => {
    return api.get("/api/v1/users/myinfo", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
};