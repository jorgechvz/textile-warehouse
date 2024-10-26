import { ProductionOrder } from "@/api/dashboard.api";
import React from "react";

interface RecentSalesProps {
  sales: ProductionOrder[];
}

export const RecentSales: React.FC<RecentSalesProps> = ({ sales }) => {
  return (
    <div className="space-y-4">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center justify-between">
          <div>{sale.product}</div>
          <div className="text-sm font-medium">{sale.quantity} units</div>
          <div className="text-sm font-medium">{sale.status}</div>
        </div>
      ))}
    </div>
  );
};
