import axios from "axios";

const API_URL = "http://localhost:3001";

// Tipos de datos
export interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: "PENDING" | "IN_PROCESS" | "COMPLETED";
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  location: string;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

export const fetchProducts = async () => {
  const { data } = await axios.get<Product[]>(`${API_URL}/products`);
  return data;
};
// Hook para manejar los datos
export const fetchProductionOrders = async () => {
  const { data } = await axios.get<ProductionOrder[]>(
    `${API_URL}/productionOrders`
  );
  return data;
};

export const fetchInventory = async () => {
  const { data } = await axios.get<InventoryItem[]>(
    `${API_URL}/inventoryItems`
  );
  return data;
};
