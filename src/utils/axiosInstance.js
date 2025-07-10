import axios from 'axios';
import showToast from './toast';


const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    showToast("error",message ||
      'An unexpected error occurred')

    return Promise.reject({
      status: error.response?.status,
      message,
    });
  }
);

export default axiosClient;
