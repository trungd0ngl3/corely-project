import axios from "axios"
import { env } from "@/lib/env"

// ─── Types ───────────────────────────────────────────────────────

interface ApiResponse<T = void> {
    code: number
    message: string
    result: T
}

export interface LoginResponse {
    token: string
    refreshToken: string
    auth: boolean
}

export interface User {
    id: string
    email: string
    fullName: string
    phone: string
    dateOfBirth: string
    roles: string[]
    isActive: boolean
}

// ─── Axios instance ──────────────────────────────────────────────

const api = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("corely-auth")
        if (stored) {
            try {
                const { state } = JSON.parse(stored)
                const token = state?.user?.token
                if (token) config.headers.Authorization = `Bearer ${token}`
            } catch { }
        }
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        const url = response.config.url ?? ""
        // Auth endpoints return {token, refreshToken, auth} — keep wrapper
        if (url.includes("/api/auth/")) return response
        // Unwrap { code, message, result } → result
        const data = response.data as ApiResponse<unknown>
        if (data?.result !== undefined) response.data = data.result
        return response
    },
    (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("corely-auth")
            window.location.href = "/auth/login"
        }
        const message =
            error.response?.data?.message || error.message || "Network error"
        return Promise.reject(new Error(message))
    },
)

// ─── Auth API ────────────────────────────────────────────────────

export const login = async (
    email: string,
    password: string,
): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>(
        "/api/auth/login",
        { email, password },
    )
    return response.data.result
}

export const register = async (
    fullName: string,
    email: string,
    phone: string,
    password: string,
): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/api/auth/register", {
        fullName,
        email,
        phone,
        password,
    })
    return response.data
}

export const getMyInfo = async (): Promise<User> => {
    const response = await api.get<User>("/api/v1/users/myinfo")
    return response.data
}

export default api