import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface HistoryItem {
  id: number;
  prompt: string;
  result: string;
  created_at: string;
}


export const sendPrompt = async (
  userId: number,
  prompt: string
): Promise<string> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Please login again");
  }

  const res = await axios.post(
    `${API_URL}/chat`,
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.response;
};






export const fetchHistory = async (userId: number): Promise<HistoryItem[]> => {
  const res = await axios.get(`${API_URL}/history/${userId}`);
  return res.data;
};


export const deleteHistory = async (historyId: number): Promise<void> => {
  await axios.delete(`${API_URL}/history/${historyId}`);
};
