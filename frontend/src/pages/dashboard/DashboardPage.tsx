import { MainNav } from "@/components/dashboard/components/main-nav";
import { Overview } from "@/components/dashboard/components/overview";
import { RecentSales } from "@/components/dashboard/components/recent-sales";
import { Search } from "@/components/dashboard/components/search-bar";
import { Spinner } from "@/components/dashboard/components/spinner";
import { StatsCards } from "@/components/dashboard/components/stats-card";
import { UserNav } from "@/components/dashboard/components/user-nav";
import { useDashboardData } from "@/components/dashboard/hooks/get-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardPage() {
  const { productsQuery, productionOrdersQuery, inventoryQuery } =
    useDashboardData();

  if (
    productsQuery.isLoading ||
    productionOrdersQuery.isLoading ||
    inventoryQuery.isLoading
  ) {
    return <Spinner />;
  }

  if (
    productsQuery.error ||
    productionOrdersQuery.error ||
    inventoryQuery.error
  ) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            {/* <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <button className="btn btn-primary">Download</button>
            </div> */}
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCards products={productsQuery.data || []} />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview orders={productionOrdersQuery.data || []} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Pedidos Recientes</CardTitle>
                    <p className="text-muted-foreground">
                      You made 265 sales this month.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <RecentSales sales={productionOrdersQuery.data || []} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
