export interface UserResponse {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    dateOfBirth?: string;
    roles: string[];
    isActive: boolean;
    avatarUrl?: string;
}

export interface UpdateProfileRequest {
    fullName: string;
    phone?: string;
    avatarUrl?: string;
    dateOfBirth?: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}