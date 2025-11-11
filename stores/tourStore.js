import { create } from "zustand";
import axios from "axios";

export const useTourStore = create((set) => ({
    tours: [],
    tour: null,
    loadingTour: false,

    getTours: async () => {
        set({ loadingTour: true });
        const { data } = await axios.get(`/api/tours`)
            .finally(() => set({ loadingTour: false }));
        set({ tours: data });
        return data;
    },

    getByIdTour: async (id) => {
        const { data } = await axios.get(`/api/tours/${id}`);
        set({ tour: data });
        return data;
    },
    deleteTour: async (id) => {
        await axios.delete(`/api/tours/${id}`);
    },
    addTour: async (tour) => {
        set({ loadingTour: true });

        const { data } = await axios.post(`/api/tours/`, tour)
            .finally(() => set({ loadingTour: false }));

        set((state) => ({
            tours: [...state.tours, data]
        }));

        return data;
    },
    updateTour: async (id, updatedData) => {
        set({ loadingTour: true });

        const { data } = await axios.patch(`/api/tours/${id}`, updatedData)
            .finally(() => set({ loadingTour: false }));

        set((state) => ({
            tours: state.tours.map((tour) =>
                tour.id === id ? data : tour
            )
        }));

        return data;
    }
}));

export const useLoadingTour = () => useTourStore((state) => state.loadingTour);
export const useGetTours = () => useTourStore((state) => state.getTours);
export const useTours = () => useTourStore((state) => state.tours);
export const useGetByIdTour = () => useTourStore((state) => state.getByIdTour);
export const useTour = () => useTourStore((state) => state.tour);
export const useAddTour = () => useTourStore((state) => state.addTour);
export const useDeleteTour = () => useTourStore((state) => state.deleteTour);
export const useUpdateTour = () => useTourStore((state) => state.updateTour);
