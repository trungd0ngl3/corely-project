export interface AuthenticateRequest {
    email: string;
    password: string;
}

export interface AuthenticateResponse {
    token: string;
    refreshToken: string;
    auth: boolean;
}

export interface UserCreationRequest {
    email: string;
    password: string;
    fullName: string;
    dateOfBirth?: string;
    phone?: string;
}

export interface RefreshTokenRequest {
    token: string;
}

export interface LogoutRequest {
    token: string;
}

export interface IntrospectRequest {
    token: string;
}

export interface IntrospectResponse {
    valid: boolean;
}