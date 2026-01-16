import axios from "axios";

const API_URL = "http://127.0.0.1:8081";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

export const saveHistory = async (userId: number, prompt: string) => {
  await axios.post(`${API_URL}/history`, {
    user_id: userId,
    prompt,
  });
};

export const getHistory = async (userId: number) => {
  const response = await axios.get(`${API_URL}/history/${userId}`);
  return response.data;
};
