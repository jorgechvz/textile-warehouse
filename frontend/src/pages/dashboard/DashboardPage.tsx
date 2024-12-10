import InventoryOverview from "@/components/dashboard/components/overview/inventory-overview";
import Layout from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import ActiveProductionOrders from "../../components/dashboard/components/overview/active-production-orders";
import LowStockItems from "../../components/dashboard/components/overview/low-stock-items";
import Warehouses from "../../components/dashboard/components/overview/warehouses";
import { RecentInventoryChanges } from "@/components/dashboard/components/overview/recent-inventory-changes";
import { useInventory } from "@/components/inventory/hooks/use-inventory";
import InventoryBarGraph from "@/components/dashboard/components/overview/inventory-bar-graph";

export function DashboardPage() {
  const { productsQuery } = useInventory();

  return (
    <Layout>
      <div className="space-y-10 mt-4">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold">Overview</h2>
          <Button className="ml-auto">
            <BarChart2 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <InventoryOverview products={productsQuery.data ?? []}/>
          <LowStockItems products={productsQuery.data ?? []}/>
          <Warehouses />
          <ActiveProductionOrders />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InventoryBarGraph products={productsQuery.data ?? []} />
          <RecentInventoryChanges products={productsQuery.data ?? []} />
        </div>
      </div>
    </Layout>
  );
}
