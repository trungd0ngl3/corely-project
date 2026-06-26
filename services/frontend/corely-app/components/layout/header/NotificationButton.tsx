"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/store/use-notification";

export function NotificationButton() {
    const unreadCount = useNotificationStore((state) => state.unreadCount);

    return (
        <Button variant="ghost" size="icon" className="relative hidden sm:flex hover:bg-primary/5 transition-all duration-200">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-flash text-[10px] font-bold text-white">
                    {unreadCount}
                </span>
            )}
        </Button>
    );
}