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
            if (window.location.pathname !== "/auth/login" && window.location.pathname !== "/auth/register") {
                window.location.href = "/auth/login"
            }
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

// ─── Cart API ────────────────────────────────────────────────────

export interface CartItemResponse {
    productId: string
    variantId?: string
    productName: string
    variantName?: string
    imageUrl: string
    price: number
    quantity: number
    subtotal: number
    inStock: boolean
    availableStock: number
    storeId?: string
    storeName?: string
}

export interface CartResponse {
    userId?: string
    items: CartItemResponse[]
    itemsByStore?: Record<string, CartItemResponse[]>
    totalAmount: number
    totalItems: number
    voucherCode?: string
    discountAmount: number
    finalAmount: number
}

export const getCart = async (): Promise<CartResponse> => {
    const response = await api.get<CartResponse>("/api/cart")
    return response.data
}

export const addToCart = async (productId: string, quantity: number, variantId?: string): Promise<void> => {
    await api.post("/api/cart/items", { productId, variantId, quantity })
}

export const updateCartItem = async (productId: string, quantity: number, variantId?: string): Promise<void> => {
    await api.put("/api/cart/items", { productId, variantId, quantity })
}

export const removeFromCart = async (productId: string): Promise<void> => {
    await api.delete(`/api/cart/items/${productId}`)
}

export const clearCartApi = async (): Promise<void> => {
    await api.delete("/api/cart")
}

export const applyVoucher = async (code: string): Promise<void> => {
    await api.post("/api/cart/voucher", { code })
}

export const removeVoucher = async (): Promise<void> => {
    await api.delete("/api/cart/voucher")
}

export default api
