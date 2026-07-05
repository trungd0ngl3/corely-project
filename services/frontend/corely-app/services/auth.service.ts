import { login as apiLogin, register as apiRegister, getMyInfo } from "@/lib/api"

export const authService = {
    login: async (email: string, password: string) => {
        const loginRes = await apiLogin(email, password)
        // Fetch user profile after getting token
        const user = await getMyInfo()
        return { ...loginRes, user }
    },

    register: async (
        fullName: string,
        email: string,
        phone: string,
        password: string,
    ) => {
        return apiRegister(fullName, email, phone, password)
    },
}