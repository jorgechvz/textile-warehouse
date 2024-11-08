import Layout from "@/components/layout/layout";
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
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Datos de ejemplo
const salesByCategory = [
  { category: "Telas", sales: 50000 },
  { category: "Accesorios", sales: 30000 },
  { category: "Hilos", sales: 20000 },
  { category: "Botones", sales: 10000 },
];

const salesOverTime = [
  { date: "2023-01", sales: 40000 },
  { date: "2023-02", sales: 45000 },
  { date: "2023-03", sales: 55000 },
  { date: "2023-04", sales: 60000 },
  { date: "2023-05", sales: 65000 },
  { date: "2023-06", sales: 70000 },
];

const topSellingProducts = [
  { name: "Tela de Algodón", sales: 5000, revenue: 50000 },
  { name: "Botones Metálicos", sales: 4500, revenue: 22500 },
  { name: "Hilo de Seda", sales: 4000, revenue: 40000 },
  { name: "Cierres de Plástico", sales: 3500, revenue: 17500 },
  { name: "Tela de Poliéster", sales: 3000, revenue: 30000 },
];

const stockLevelsOverTime = [
  {
    date: "2023-01",
    telas: 1000,
    accesorios: 2000,
    hilos: 1500,
    botones: 3000,
  },
  {
    date: "2023-02",
    telas: 1200,
    accesorios: 1800,
    hilos: 1600,
    botones: 2800,
  },
  {
    date: "2023-03",
    telas: 1100,
    accesorios: 1900,
    hilos: 1400,
    botones: 3100,
  },
  {
    date: "2023-04",
    telas: 1300,
    accesorios: 2100,
    hilos: 1700,
    botones: 2900,
  },
  {
    date: "2023-05",
    telas: 1400,
    accesorios: 2000,
    hilos: 1800,
    botones: 3200,
  },
  {
    date: "2023-06",
    telas: 1500,
    accesorios: 2200,
    hilos: 1900,
    botones: 3300,
  },
];

const productMovement = [
  { product: "Tela de Algodón", inflow: 1000, outflow: 800 },
  { product: "Botones Metálicos", inflow: 2000, outflow: 1800 },
  { product: "Hilo de Seda", inflow: 1500, outflow: 1300 },
  { product: "Cierres de Plástico", inflow: 1800, outflow: 1600 },
  { product: "Tela de Poliéster", inflow: 1200, outflow: 1000 },
];

const topCustomers = [
  { name: "Cliente A", orders: 50, revenue: 100000 },
  { name: "Cliente B", orders: 45, revenue: 90000 },
  { name: "Cliente C", orders: 40, revenue: 80000 },
  { name: "Cliente D", orders: 35, revenue: 70000 },
  { name: "Cliente E", orders: 30, revenue: 60000 },
];

const ordersByRegion = [
  { region: "Norte", orders: 500 },
  { region: "Sur", orders: 400 },
  { region: "Este", orders: 300 },
  { region: "Oeste", orders: 200 },
];

const customerRetentionRate = [
  { month: "Ene", rate: 0.8 },
  { month: "Feb", rate: 0.82 },
  { month: "Mar", rate: 0.85 },
  { month: "Abr", rate: 0.83 },
  { month: "May", rate: 0.87 },
  { month: "Jun", rate: 0.9 },
];

const performanceMetrics = {
  orderFulfillmentTime: 2.5, // días
  returnRate: 0.05, // 5%
};

const revenueGrowth = [
  { month: "Ene", revenue: 100000 },
  { month: "Feb", revenue: 110000 },
  { month: "Mar", revenue: 120000 },
  { month: "Abr", revenue: 125000 },
  { month: "May", revenue: 135000 },
  { month: "Jun", revenue: 150000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const AnalyticsDashboard = () => {
  return (
    <Layout>
      <div className="space-y-10 px-8">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>

        {/* Sales Analytics */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Sales Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={salesByCategory}
                      dataKey="sales"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {salesByCategory.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellingProducts.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>${product.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Analytics */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Inventory Analytics</h3>
          <Card>
            <CardHeader>
              <CardTitle>Stock Levels Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockLevelsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="telas" stroke="#8884d8" />
                  <Line type="monotone" dataKey="accesorios" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="hilos" stroke="#ffc658" />
                  <Line type="monotone" dataKey="botones" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Movement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productMovement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inflow" fill="#8884d8" />
                  <Bar dataKey="outflow" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$500,000</div>
              <p className="text-sm text-muted-foreground">
                Estimated total value of current inventory
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Analytics */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Customer Analytics</h3>
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomers.map((customer) => (
                    <TableRow key={customer.name}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Orders by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ordersByRegion}
                      dataKey="orders"
                      nameKey="region"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {ordersByRegion.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customer Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={customerRetentionRate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Fulfillment Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {performanceMetrics.orderFulfillmentTime} days
                </div>
                <p className="text-sm text-muted-foreground">
                  Average time to complete an order
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Return Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {(performanceMetrics.returnRate * 100).toFixed(2)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Percentage of products returned
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;
