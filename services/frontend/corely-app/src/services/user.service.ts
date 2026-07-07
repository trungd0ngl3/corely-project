const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getMyInfo(token: string) {
    const res = await fetch(`${API_URL}/api/v1/users/myinfo`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch user info");
    return res.json();
}

export async function updateUser(userId: string, data: any, token: string) {
    const res = await fetch(`${API_URL}/api/v1/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
}

// --- Address ---
export interface Address {
    id: number;
    recipientName: string;
    phone: string;
    street: string;
    ward: string;
    district: string;
    city: string;
    isDefault: boolean;
}

export const addressApi = {
    async getAddresses(token: string) {
        const res = await fetch(`${API_URL}/api/v1/address`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch addresses");
        return res.json();
    },
    async createAddress(data: Omit<Address, "id" | "isDefault">, token: string) {
        const res = await fetch(`${API_URL}/api/v1/address`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed to create address");
        return res.json();
    },
    async updateAddress(id: number, data: Omit<Address, "id" | "isDefault">, token: string) {
        const res = await fetch(`${API_URL}/api/v1/address/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed to update address");
        return res.json();
    },
    async deleteAddress(id: number, token: string) {
        const res = await fetch(`${API_URL}/api/v1/address/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to delete address");
        return res.json();
    }
};