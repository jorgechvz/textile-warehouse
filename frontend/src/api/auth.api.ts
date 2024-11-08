import { LoginType } from "@/components/auth/types/login-type";
import axios from "axios";

// Load API_URL from environment
const API_URL = import.meta.env.VITE_API_URL;

export const loginRequest = async (data: LoginType) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const registerRequest = async (data: LoginType) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};
