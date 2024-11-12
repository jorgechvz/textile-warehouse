import { Product } from "@/components/inventory/types/inventory.types";
import { z } from "zod";

export type ProductFormType = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "totalStock"
> & {
  inventoryManagement: {
    stock: string;
    locationId: string;
    status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  }[];
};

export type WarehouseLocation = {
  id: string;
  name: string;
};

export const ProductFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  sku: z.string().length(13, { message: "SKU must be 13 characters" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  inventoryManagement: z.array(
    z.object({
      stock: z.string().min(1, { message: "Stock is required" }),
      locationId: z.string().min(1, { message: "Location is required" }),
      status: z.enum(["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"]),
    })
  ),
});
