import { Notification } from "@/types/notification";

export const notificationService = {
    getAll: async (): Promise<Notification[]> => {
        // Mock data.
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([]);
            }, 500);
        });
    },
    getUnreadCount: async (): Promise<number> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(0);
            }, 500);
        });
    }
};