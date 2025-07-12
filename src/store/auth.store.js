import { create } from 'zustand';
import axiosClient from '../utils/axiosInstance';

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosClient.post('/auth/login', data);
      set({ user: res.data.data, loading: false });
      if(res.status == 200){
        return res
      }
      
      return false

    } catch (err) {
      set({ error: err.message || 'Login failed', loading: false });
    }
  },

  register: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosClient.post('/auth/register', data);
      if(res.status == 201){
        set({ user: res.data.data, loading: false });
        return res
      }
      return false
    } catch (err) {
      set({ error: err.message || 'Registration failed', loading: false });
    }
  },

  logout: () => {
    axiosClient.get('/auth/logout');
    set({ user: null });
  },
  

  setUser: (user) => set({ user }),

  fetchUserProfile: async () => {
    try {
      set({ loading: true });
      console.log("heerererere")
      const res = await axiosClient.get('/auth/me');
      if(res.status == 200){
        set({ user: res.data.data, loading: false });
      }
    } catch (err) {
      console.error('Error fetching profile:', err.message);
      showToast('error', 'Session expired or not logged in');
      set({ user: null, loading: false });
    }
  }
}));
