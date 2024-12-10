import { Product } from "@/components/inventory/types/inventory.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LowStockItemsProps {
  products: Product[];
}
export default function LowStockItems({ products }: LowStockItemsProps) {
  const getLowStockItems = products.filter((product) =>
    product.inventoryManagement.some((item) => item.status === "LOW_STOCK")
  );

  const lastWeekLowStockItems = products.filter((product) =>
    product.inventoryManagement.some((item) => {
      if (!item.updatedAt) return false;

      const updatedAt = new Date(item.updatedAt);
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      return item.status === "LOW_STOCK" && updatedAt > oneWeekAgo;
    })
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{getLowStockItems.length}</div>
        <p className="text-xs text-muted-foreground">
          +{lastWeekLowStockItems.length} from last week
        </p>
      </CardContent>
    </Card>
  );
}
