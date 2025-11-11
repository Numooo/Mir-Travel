import { create } from "zustand";
import axios from "axios";

export const useLocationStore = create((set) => ({
    locations: [],
    location: null,
    loadingLocation: false,

    getLocations: async () => {
        set({ loadingLocation: true });
        const { data } = await axios.get(`/api/locations`)
            .finally(() => set({ loadingLocation: false }));
        set({ locations: data });
        return data;
    },

    getByIdLocation: async (id) => {
        const { data } = await axios.get(`/api/locations/${id}`);
        set({ location: data });
        return data;
    },
    deleteLocation: async (id) => {
        await axios.delete(`/api/locations/${id}`);
    },
    addLocation: async (location) => {
        set({ loadingLocation: true });

        const { data } = await axios.post(`/api/locations/`, location)
            .finally(() => set({ loadingLocation: false }));

        set((state) => ({
            locations: [...state.locations, data]
        }));

        return data;
    },

    updateLocation: async (id, updatedData) => {
        set({ loadingLocation: true });

        const { data } = await axios.patch(`/api/locations/${id}`, updatedData)
            .finally(() => set({ loadingLocation: false }));

        set((state) => ({
            locations: state.locations.map((loc) =>
                loc.id === id ? data : loc
            )
        }));

        return data;
    }
}));

export const useLoadingLocation = () => useLocationStore((state) => state.loadingLocation);
export const useGetLocations = () => useLocationStore((state) => state.getLocations);
export const useLocations = () => useLocationStore((state) => state.locations);
export const useGetByIdLocation = () => useLocationStore((state) => state.getByIdLocation);
export const useLocation = () => useLocationStore((state) => state.location);
export const useAddLocation = () => useLocationStore((state) => state.addLocation);
export const useDeleteLocation = () => useLocationStore((state) => state.deleteLocation);
export const useUpdateLocation = () => useLocationStore((state) => state.updateLocation);
