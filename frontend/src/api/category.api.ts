import { Category } from "@/components/inventory/types/inventory.types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;



export const fetchCategories = async () => {
  const { data } = await axios.get<Category[]>(`${API_URL}/category`);
  return data;
};
