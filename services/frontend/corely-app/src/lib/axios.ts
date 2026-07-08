import axios from "axios";
import { useAuthStore } from "@/hooks/use-auth";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        const data = response.data;
        if (data?.result !== undefined) response.data = data.result;
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
            if (
                typeof window !== "undefined" &&
                window.location.pathname !== "/auth/login" &&
                window.location.pathname !== "/auth/register"
            ) {
                window.location.href = "/auth/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;