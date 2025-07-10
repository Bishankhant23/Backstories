import axiosClient from "../utils/axiosInstance";

export const deleteSeasonById = async (seasonId) => {
  try {
    const res = await axiosClient.delete(`/season/${seasonId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};