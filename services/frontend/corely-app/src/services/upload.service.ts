import api from "@/lib/axios";

export const UploadService = {
    uploadImage: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        return await api.post<{ url: string }>("/api/v1/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }
};