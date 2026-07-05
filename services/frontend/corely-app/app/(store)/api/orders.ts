const API_URL = "http://localhost:8080";

export async function getMyOrders(token: string) {
    const res = await fetch(`${API_URL}/api/v1/orders/my-orders`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}