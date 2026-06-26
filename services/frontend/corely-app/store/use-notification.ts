import { create } from "zustand";
import { Notification } from "@/types/notification";

interface NotificationState {
    items: Notification[];
    unreadCount: number;
    isLoading: boolean;
    setNotifications: (items: Notification[], unreadCount: number) => void;
    setLoading: (isLoading: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    items: [],
    unreadCount: 0,
    isLoading: false,
    setNotifications: (items, unreadCount) => set({ items, unreadCount }),
    setLoading: (isLoading) => set({ isLoading }),
}));