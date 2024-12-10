import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventoryItems } from "../hooks/use-inventory";
import { AlertTriangle, Package } from "lucide-react";

interface InventoryCardProps {
  warehouseId: string;
}
export default function InventoryCards({ warehouseId }: InventoryCardProps) {
  const { inventoryOverviewByWarehouseIdQuery } =
    useInventoryItems(warehouseId);
  if (!inventoryOverviewByWarehouseIdQuery.data) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }
  const { data: inventoryOverview } = inventoryOverviewByWarehouseIdQuery;
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inventoryOverview.total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {inventoryOverview.outOfStock}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inventoryOverview.lowStock}</div>
        </CardContent>
      </Card>
    </>
  );
}
