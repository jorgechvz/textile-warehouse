import { ProductionOrder } from "@/api/dashboard.api";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
  orders: ProductionOrder[];
}

export const Overview = ({ orders }: OverviewProps) => {
  const data = orders.map((order) => ({
    name: order.product,
    quantity: order.quantity,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" />
        <YAxis stroke="#888888" />
        <Bar dataKey="quantity" fill="#4F46E5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
