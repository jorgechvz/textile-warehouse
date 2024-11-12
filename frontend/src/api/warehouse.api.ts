import { WarehouseLocation } from "@/components/inventory/types/inventory.types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchWarehouseLocations = async () => {
  const { data } = await axios.get<WarehouseLocation[]>(
    `${API_URL}/warehouse-location`
  );
  return data;
};
