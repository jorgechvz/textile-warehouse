import { fetchWarehouseLocations } from "@/api/warehouse.api";
import { useQuery } from "@tanstack/react-query";

export const useWarehouse = () => {
  const queryWarehouseLocations = useQuery({
    queryKey: ["warehouseLocations"],
    queryFn: fetchWarehouseLocations,
  });

  return {
    queryWarehouseLocations,
  };
};
