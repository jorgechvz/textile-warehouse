import { InventoryItem, ProductionOrder } from "@/api/dashboard.api";
import { InventoryStatusChart } from "@/components/dashboard/components/overview/inventory-status-chart";
import KPICard from "@/components/dashboard/components/kpi-cards";
import { Spinner } from "@/components/dashboard/components/spinner";
import { useDashboardData } from "@/components/dashboard/hooks/get-dashboard";
import {
  lowStockAlerts,
  orderStatusData,
  recentOrders,
  salesData,
  topSellingProducts,
} from "@/components/dashboard/utils/utils";
import Layout from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  BarChart2,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  const kpiData = {
    totalProducts: productsQuery.data?.length,
    lowStockProducts: inventoryQuery.data?.filter(
      (item: InventoryItem) => item.status === "LOW_STOCK"
    ).length,
    totalOrders: productionOrdersQuery.data?.length,
    pendingOrders: productionOrdersQuery.data?.filter(
      (order: ProductionOrder) => order.status === "PENDING"
    ).length,
    salesToday: 0,
    revenueThisMonth: 0,
  };
  return (
    <Layout>
      <div className="space-y-10 mt-4 px-8">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold">Overview</h2>
          <Button className="ml-auto">
            <BarChart2 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard
            title="Total Products"
            value={kpiData.totalProducts}
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
          />
          <KPICard
            title="Low Stock Products"
            value={kpiData.lowStockProducts}
            icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
          />
          <KPICard
            title="Total Orders"
            value={kpiData.totalOrders}
            icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
          />
          <KPICard
            title="Pending Orders"
            value={kpiData.pendingOrders}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <KPICard
            title="Sales Today"
            value={`$${kpiData.salesToday}`}
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <KPICard
            title="Revenue This Month"
            value={`$${kpiData.revenueThisMonth}`}
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InventoryStatusChart />
          <Card>
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart layout="vertical" data={topSellingProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Min Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockAlerts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.currentStock}</TableCell>
                      <TableCell>{product.minStock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
