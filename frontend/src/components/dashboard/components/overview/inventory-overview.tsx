import { Product } from "@/components/inventory/types/inventory.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InventoryOverviewProps {
  products: Product[];
}

export default function InventoryOverview({
  products,
}: InventoryOverviewProps) {
  const lastMonthProducts = products.filter((product) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return product.createdAt ? new Date(product.createdAt) > lastMonth : false;
  });
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{products.length}</div>
        <p className="text-xs text-muted-foreground">
          +{lastMonthProducts.length} from last month
        </p>
      </CardContent>
    </Card>
  );
}
