export interface AddressRequest {
    streetAddress: string;
    ward: string;
    district: string;
    city: string;
    isDefault?: boolean;
}

export interface AddressResponse {
    id: string;
    streetAddress: string;
    ward: string;
    district: string;
    city: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}