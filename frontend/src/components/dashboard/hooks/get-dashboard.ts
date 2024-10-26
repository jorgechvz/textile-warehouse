import {
  fetchInventory,
  fetchProductionOrders,
  fetchProducts,
} from "@/api/dashboard.api";
import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const productionOrdersQuery = useQuery({
    queryKey: ["productionOrders"],
    queryFn: fetchProductionOrders,
  });
  const inventoryQuery = useQuery({
    queryKey: ["inventoryItems"],
    queryFn: fetchInventory,
  });

  return {
    productsQuery,
    productionOrdersQuery,
    inventoryQuery,
  };
};
