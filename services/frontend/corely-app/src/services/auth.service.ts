import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { AuthenticateRequest, UserCreationRequest, AuthenticateResponse, RefreshTokenRequest, LogoutRequest } from "@/types/auth";

export const AuthService = {
    async login(data: AuthenticateRequest) {
        const res = await api.post<AuthenticateResponse>(
            "/api/v1/auth/login",
            data
        );

        return res.data;
    },

    async register(data: UserCreationRequest) {
        const res = await api.post<ApiResponse<void>>(
            "/api/v1/auth/register",
            data
        );
        return res.data;
    },

    async logout(data: LogoutRequest) {
        await api.post<ApiResponse<void>>(
            "/api/v1/auth/tokens/logout",
            data
        );
    },
};
