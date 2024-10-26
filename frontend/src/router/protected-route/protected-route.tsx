/* import { useAuthStore } from "@/context/auth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  redirectTo?: string;
  children?: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/",
}) => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to={redirectTo} replace />;
  return children ?? <Outlet />;
};

export default ProtectedRoute;
 */