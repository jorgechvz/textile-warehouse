// import { getTokenFromLocalStorage } from "@/components/auth/utils/utils";
import {
  InventoryItemsByLocationId,
  InventoryOverview,
} from "@/components/inventory/types/inventory.types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// const BEAREAR_TOKEN = getTokenFromLocalStorage();

export type InventoryItemsResponse = {
  items: InventoryItemsByLocationId[];
  total?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
};
export const fetchInventoryOverviewByWarehouseId = async (id: string) => {
  const { data } = await axios.get<InventoryOverview>(
    `${API_URL}/products/inventory/overview/${id}`
  );
  return data;
};

export const fetchInventoryItemsByLocationId = async (
  id: string,
  page?: number,
  pageSize?: number
): Promise<InventoryItemsResponse> => {
  const params = new URLSearchParams();

  if (page) params.append("page", page.toString());
  if (pageSize) params.append("pageSize", pageSize.toString());

  const url = `${API_URL}/products/inventory/items/${id}?${params.toString()}`;

  const { data } = await axios.get<InventoryItemsResponse>(url);

  return data;
};
