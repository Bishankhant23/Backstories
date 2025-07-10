import { create } from 'zustand';
import axiosClient from '../utils/axiosInstance';

export const useEpisodeStore = create((set) => ({
  episode: null,
  loading: false,
  error: null,

  fetchEpisodeById: async (episodeId) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosClient.get(`/episode/${episodeId}`);
      set({ episode: res.data?.data, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch episode', loading: false });
    }
  },

  clearEpisode: () => set({ episode: null }),
}));
