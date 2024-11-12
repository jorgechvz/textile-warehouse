import { getTokenFromLocalStorage } from "@/components/auth/utils/utils";
import { Product } from "@/components/inventory/types/inventory.types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const BEAREAR_TOKEN = getTokenFromLocalStorage();
export const fetchProducts = async () => {
  const { data: response } = await axios.get<Product[]>(`${API_URL}/products`);
  return response;
};

export const fetchProductById = async (id: string) => {
  const { data } = await axios.get<Product>(`${API_URL}/products/${id}`);
  return data;
};

export const createProduct = async (
  product: Omit<Product, "id" | "updatedAt" | "createdAt" | "totalStock">
) => {
  const { data } = await axios.post<Product>(`${API_URL}/products`, product);
  return data;
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const { data } = await axios.put<Product>(
    `${API_URL}/products/${id}`,
    product,
    {
      headers: {
        Authorization: `Bearer ${BEAREAR_TOKEN}`,
        withCredentials: true,
      },
    }
  );
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await axios.delete<Product>(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${BEAREAR_TOKEN}`,
      withCredentials: true,
    },
  });
  return data;
};

export const addStock = async (id: string, stock: number) => {
  const { data } = await axios.put<Product>(
    `${API_URL}/products/inventory/add/${id}`,
    stock,
    {
      headers: {
        Authorization: `Bearer ${BEAREAR_TOKEN}`,
        withCredentials: true,
      },
    }
  );
  return data;
};

export const removeStock = async (id: string, stock: number) => {
  const { data } = await axios.put<Product>(
    `${API_URL}/products/inventory/remove/${id}`,
    stock,
    {
      headers: {
        Authorization: `Bearer ${BEAREAR_TOKEN}`,
        withCredentials: true,
      },
    }
  );
  return data;
};
