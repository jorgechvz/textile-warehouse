export const inventoryData = [
  { product: "Telas", stock: 400,  fill: "hsl(var(--chart-1))"  },
  { product: "Accesorios", stock: 300, fill: "hsl(var(--chart-2))" },
  { product: "Hilos", stock: 200, fill: "hsl(var(--chart-3))" },
  { product: "Botones", stock: 100, fill: "hsl(var(--chart-4))" },
];

export const salesData = [
  { name: "Ene", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Abr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

export const orderStatusData = [
  { name: "Pendientes", value: 30 },
  { name: "Procesados", value: 50 },
  { name: "Completados", value: 150 },
  { name: "Devueltos", value: 20 },
];

export const topSellingProducts = [
  { name: "Tela de Algodón", sales: 500 },
  { name: "Botones Metálicos", sales: 450 },
  { name: "Hilo de Seda", sales: 400 },
  { name: "Cierres de Plástico", sales: 350 },
  { name: "Tela de Poliéster", sales: 300 },
];

export const recentOrders = [
  {
    id: "ORD001",
    customer: "Cliente A",
    date: "2023-06-20",
    status: "Completado",
  },
  {
    id: "ORD002",
    customer: "Cliente B",
    date: "2023-06-21",
    status: "Pendiente",
  },
  {
    id: "ORD003",
    customer: "Cliente C",
    date: "2023-06-22",
    status: "Procesado",
  },
  {
    id: "ORD004",
    customer: "Cliente D",
    date: "2023-06-23",
    status: "Completado",
  },
  {
    id: "ORD005",
    customer: "Cliente E",
    date: "2023-06-24",
    status: "Pendiente",
  },
];

export const lowStockAlerts = [
  { id: "PRD001", name: "Tela de Algodón", currentStock: 50, minStock: 100 },
  { id: "PRD002", name: "Botones Metálicos", currentStock: 30, minStock: 50 },
  { id: "PRD003", name: "Hilo de Seda", currentStock: 20, minStock: 40 },
];
