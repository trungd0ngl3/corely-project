import { Category } from "@/types/category";

export const categoryService = {
    getAll: async (): Promise<Category[]> => {
        // Mock data. Replace with real API call later.
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: "cpu", name: "CPU", slug: "cpu" },
                    { id: "ram", name: "RAM", slug: "ram" },
                    { id: "ssd", name: "SSD", slug: "ssd" },
                    { id: "gpu", name: "GPU", slug: "gpu" },
                    { id: "mainboard", name: "Mainboard", slug: "mainboard" },
                    { id: "laptop", name: "Laptop", slug: "laptop" },
                    { id: "monitor", name: "Monitor", slug: "monitor" },
                    { id: "accessory", name: "Accessory", slug: "accessory" },
                ]);
            }, 500);
        });
    }
};