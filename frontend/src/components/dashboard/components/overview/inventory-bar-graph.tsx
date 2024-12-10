import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Product } from "@/components/inventory/types/inventory.types";

export interface InventoryBarGraphProps {
  products: Product[];
}

export default function InventoryBarGraph({
  products,
}: InventoryBarGraphProps) {
  const chartData = products.map((product) => ({
    product: product.name,
    lowStock: product.inventoryManagement
      .map((inventory) =>
        inventory.stock && inventory.status === "LOW_STOCK"
          ? inventory.stock
          : 0
      )
      .reduce((a, b) => a + b, 0),
    inStock: product.inventoryManagement
      .map((inventory) =>
        inventory.stock && inventory.status === "IN_STOCK" ? inventory.stock : 0
      )
      .reduce((a, b) => a + b, 0),
    outOfStock: product.inventoryManagement
      .map((inventory) =>
        inventory.stock && inventory.status === "OUT_OF_STOCK"
          ? inventory.stock
          : 0
      )
      .reduce((a, b) => a + b, 0),
  }));
  const chartConfig = {
    inStock: {
      label: "In Stock",
      color: "hsl(var(--chart-1))",
    },
    lowStock: {
      label: "Low Stock",
      color: "hsl(var(--chart-2))",
    },
    outOfStock: {
      label: "Out of Stock",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Bar Graph</CardTitle>
        <CardDescription>Inventory status of all products</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="product"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="inStock"
              stackId="a"
              fill="var(--color-lowStock)"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="lowStock"
              stackId="a"
              fill="var(--color-inStock)"
              radius={[0, 0, 2, 2]}
            />
            <Bar
              dataKey="outOfStock"
              stackId="a"
              fill="var(--color-outOfStock)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
