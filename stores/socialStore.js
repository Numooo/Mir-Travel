import { create } from "zustand";
import axios from "axios";
import {useTourStore} from "@/stores/tourStore";

export const useSocialStore = create((set) => ({
    socials: [],
    social: null,
    loadingSocial: false,

    getSocials: async () => {
        const { data } = await axios.get(`/api/socials`);
        set({ socials: data });
        return data;
    },

    getByIdSocial: async (id) => {
        const { data } = await axios.get(`/api/socials/${id}`);
        set({ social: data });
        return data;
    },
    deleteSocial: async (id) => {
        await axios.delete(`/api/socials/${id}`);
    },
    addSocial: async (social) => {
        set({ loadingSocial: true });

        const { data } = await axios.post(`/api/socials/`, social)
            .finally(() => set({ loadingSocial: false }));

        set((state) => ({
            socials: [...state.socials, data]
        }));

        return data;
    },

    updateSocial: async (id, updatedData) => {
        set({ loadingSocial: true });

        const { data } = await axios.patch(`/api/socials/${id}`, updatedData)
            .finally(() => set({ loadingSocial: false }));

        set((state) => ({
            socials: state.socials.map((social) =>
                social.id === id ? data : social
            )
        }));

        return data;
    }
}));

export const useLoadingSocial = () => useSocialStore((state) => state.loadingSocial);
export const useGetSocials = () => useSocialStore((state) => state.getSocials);
export const useSocials = () => useSocialStore((state) => state.socials);
export const useGetByIdSocial = () => useSocialStore((state) => state.getByIdSocial);
export const useSocial = () => useSocialStore((state) => state.social);
export const useAddSocial = () => useSocialStore((state) => state.addSocial);
export const useDeleteSocial = () => useSocialStore((state) => state.deleteSocial);
export const useUpdateSocial = () => useSocialStore((state) => state.updateSocial);
