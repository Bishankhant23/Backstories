import { create } from 'zustand';
import axiosClient from '../utils/axiosInstance';

export const useUserProfileStore = create((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  // Fetch another user's profile
  fetchUserProfileById: async (userId) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosClient.get(`/user/${userId}`);
      set({ profile: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch user profile', loading: false });
    }
  },

  // Set profile manually (e.g., from /auth/me)
  setProfile: (userData) => {
    set({ profile: userData });
  },

  // Clear the profile
  clearProfile: () => set({ profile: null }),

  // Remove a single season by ID
  deleteSingleSeason: (seasonId) => {
    try {
      const profile = get();
      console.log("Pppppppppppppppppp",profile)
      if (!profile || !Array.isArray(profile.seasons)) {
        console.warn("Profile not loaded or seasons missing.");
        return false;
      }

      const updatedSeasons = profile.seasons.filter(
        (season) => season._id !== seasonId
      );

      set({ profile: { ...profile, seasons: updatedSeasons } });
      return true;
    } catch (err) {
      console.error("Failed to delete season:", err);
      return false;
    }
  },
}));
