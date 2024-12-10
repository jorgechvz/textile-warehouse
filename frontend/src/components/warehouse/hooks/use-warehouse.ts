import {
  fetchWarehouseCount,
  fetchWarehouses,
} from "@/api/warehouse.api";
import { useQuery } from "@tanstack/react-query";

export const useWarehouse = () => {
  const queryWarehouses = useQuery({
    queryKey: ["warehouses"],
    queryFn: fetchWarehouses,
  });

  const queryCountWarehouseLocations = useQuery({
    queryKey: ["warehouseLocationsCount"],
    queryFn: fetchWarehouseCount,
  });

  return {
    queryWarehouses,
    queryCountWarehouseLocations,
  };
};
