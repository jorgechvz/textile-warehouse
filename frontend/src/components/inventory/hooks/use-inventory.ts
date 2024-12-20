import {
  addStock,
  createProduct,
  deleteProduct,
  fetchProducts,
  removeStock,
  updateProduct,
} from "@/api/product.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types/inventory.types";
import {
  fetchInventoryItemsByLocationId,
  fetchInventoryOverviewByWarehouseId,
} from "@/api/inventory.api";

export const useInventoryItems = (
  warehouseId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const inventoryOverviewByWarehouseIdQuery = useQuery({
    queryKey: ["inventoryOverviewByWarehouseId", warehouseId],
    queryFn: () => fetchInventoryOverviewByWarehouseId(warehouseId),
  });

  const inventoryItemsByWarehouseIdQuery = useQuery({
    queryKey: ["inventoryItemsByWarehouseId", warehouseId, page, pageSize],
    queryFn: () => fetchInventoryItemsByLocationId(warehouseId, page, pageSize),
    placeholderData: (previousData, _) => previousData,
  });

  return {
    inventoryOverviewByWarehouseIdQuery,
    inventoryItemsByWarehouseIdQuery,
  };
};

export const useInventory = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const addProductMutation = useMutation({
    mutationFn: async (product: Omit<Product, "id">) => {
      return await createProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (product: Partial<Product>) => {
      return await updateProduct(product?.id ?? "", product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const addStockMutation = useMutation({
    mutationFn: async ({ id, stock }: { id: string; stock: number }) => {
      return await addStock(id, stock);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const removeStockMutation = useMutation({
    mutationFn: async ({ id, stock }: { id: string; stock: number }) => {
      return await removeStock(id, stock);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    productsQuery,
    addProductMutation,
    updateProductMutation,
    deleteProductMutation,
    addStockMutation,
    removeStockMutation,
  };
};
