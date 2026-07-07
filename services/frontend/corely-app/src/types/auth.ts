import { ApiResponse } from "./api";

export interface User {
    id: string;
    email: string;
    fullName: string;
    avatar?: string;
    phone?: string;
    dob?: string;
    role: string;
    provider: string;
    emailVerified: boolean;
}

export interface LoginResult {
    token: string;
    refreshToken: string;
    auth: boolean;
}
