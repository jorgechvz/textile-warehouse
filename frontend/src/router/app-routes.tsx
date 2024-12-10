import { type RouteObject } from "react-router-dom";
import { Paths } from "./path.routes";
import { LoginPage } from "@/pages/auth";
import { DashboardPage } from "@/pages/dashboard";
import AnalyticsDashboard from "@/pages/dashboard/AnalyticsPage";
import { InventoryPage } from "@/pages/inventory";
import { ProductsPage } from "@/pages/products/ProductsPage";

export const AppRoutes: RouteObject[] = [
  {
    path: Paths.app.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: Paths.app.ANALYTICS,
    element: <AnalyticsDashboard />,
  },
  {
    path: Paths.app.INVENTORY,
    element: <InventoryPage />,
  },
  {
    path: Paths.app.PRODUCTS,
    element: <ProductsPage />,
  }
];

export const AuhtRoutes: RouteObject[] = [
  { path: Paths.auth.LOGIN, element: <LoginPage /> },
];
