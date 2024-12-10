import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWarehouse } from "@/components/warehouse/hooks/use-warehouse";

export default function Warehouses() {
  const { queryCountWarehouseLocations } = useWarehouse();
  if (!queryCountWarehouseLocations) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }
  const count = queryCountWarehouseLocations.data || 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          In {count} differents locations
        </p>
      </CardContent>
    </Card>
  );
}
