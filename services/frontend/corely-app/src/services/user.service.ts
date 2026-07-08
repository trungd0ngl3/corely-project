import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { ChangePasswordRequest, UpdateProfileRequest, UserResponse } from "@/types/user";

export const UserService = {
    async getMyInfo() {
        const res = await api.get<ApiResponse<UserResponse>>(
            "/api/v1/users/me"
        );

        return res.data;
    },

    async updateMyInfo(data: UpdateProfileRequest) {
        const res = await api.put<ApiResponse<UserResponse>>(
            "/api/v1/users/me",
            data
        );

        return res.data;
    },

    async deleteMyInfo() {
        await api.delete<ApiResponse<void>>(
            "/api/v1/users/me"
        );
    },

    async changePassword(data: ChangePasswordRequest) {
        await api.put<ApiResponse<void>>(
            "/api/v1/users/password",
            data
        );
    },
};