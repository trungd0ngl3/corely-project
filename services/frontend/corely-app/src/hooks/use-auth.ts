import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse as User } from '@/types/user';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isHydrated: boolean;
    setHydrated: (state: boolean) => void;
    login: (user: User | null, token: string, refreshToken: string) => void;
    logout: () => void;
    updateUser: (user: User) => void;
    refreshAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isHydrated: false,
            setHydrated: (state) => set({ isHydrated: state }),
            login: (user, token, refreshToken) => set({ user, accessToken: token, refreshToken, isAuthenticated: true }),
            logout: () => set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),
            updateUser: (user) => set({ user }),
            refreshAccessToken: (token) => set({ accessToken: token }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            }
        }
    )
);