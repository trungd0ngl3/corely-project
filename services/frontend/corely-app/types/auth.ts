export enum AuthProvider {
    LOCAL = 'LOCAL',
    GOOGLE = 'GOOGLE',
    FACEBOOK = 'FACEBOOK',
}

export type Role = "USER" | "ADMIN" | "STAFF";

export interface User {
    id: string;
    email: string;
    fullName: string;
    avatar?: string;
    provider: AuthProvider | string;
    providerId?: string;
    emailVerified: boolean;
    dob?: string;
    phone?: string;
    role: Role;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}