import axiosClient from "../utils/axiosInstance";

export const searchUsers = async (query) => {
  const res = await axiosClient.get(`/user/search?query=${query}`);
  return res.data.data; 
};