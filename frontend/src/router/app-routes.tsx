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
    /* children: [
      {
        path: Paths.app.PUBLICACIONES,
        element: <CotizacionesInicio />,
      },
      {
        path: Paths.app.COTIZACIONES_NUEVA,
        element: <NuevaCotizacion />,
      },
      {
        path: Paths.app.COTIZACIONES_DETALLE,
        element: <PublicacionDetalle />,
      },
      {
        path: Paths.app.PUBLICAR,
        element: <PublicarPage />,
      },
      {
        path: Paths.app.DIRECTORIO,
        element: <DirectoryPage />,
      },
      {
        path: Paths.app.EMPRESA + ":id",
        element: <CompanyPage />,
      },
      {
        path: Paths.app.CLIENTES,
        element: <ClientesPage />,
      },
      {
        path: Paths.app.PERFIL,
        element: <ProfilePage />,
      },
      {
        path: Paths.app.DATA_TECNICA,
        element: <DataTecnicaInicio isEdit={true} />,
      },
      {
        path: Paths.app.CLIENTES_COTIZACION,
        element: <NuevaCotizacion />,
      },
      {
        path: Paths.NOT_FOUND,
        element: <NotFound />,
      },
    ], */
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
