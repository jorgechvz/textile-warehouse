import { WarehouseLocation } from "@/components/inventory/types/inventory.types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchWarehouses = async () => {
  const { data } = await axios.get<WarehouseLocation[]>(
    `${API_URL}/warehouse-location`
  );
  return data;
};

export const fetchWarehouseCount = async () => {
  const { data } = await axios.get<number>(
    `${API_URL}/warehouse-location/count`
  );
  return data;
}