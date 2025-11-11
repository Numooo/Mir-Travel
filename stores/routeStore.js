import { create } from "zustand";
import axios from "axios";

export const useRouteStore = create((set) => ({
    routesList: [],
    getRoutes: async () => {
        const { data } = await axios.get(`/api/routes`);
        set({ routesList: data.routes });
        return data;
    },

    uploadedImage: "",
    uploading: false,
    uploadError: null,
    uploadImage: async (file) => {
        if (!file) return;

        set({ uploading: true, uploadError: null });

        const formData = new FormData();
        formData.append("file", file);

        try {
            const { data } = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            set({ uploadedImage: data.path, uploading: false });
            return data.path;
        } catch (err) {
            console.error(err);
            set({ uploadError: "Ошибка при загрузке файла", uploading: false });
        }
    },
}));

export const useGetRoutes = () => useRouteStore((state) => state.getRoutes);
export const useRoutes = () => useRouteStore((state) => state.routesList);
export const useUploadImage = () => useRouteStore((state) => state.uploadImage);
export const useUploadedImage = () => useRouteStore((state) => state.uploadedImage);
export const useUploading = () => useRouteStore(state => state.uploading);
export const useUploadError = () => useRouteStore(state => state.uploadError);
