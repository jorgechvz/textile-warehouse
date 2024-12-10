import { Product } from "@/components/inventory/types/inventory.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

interface RecentInventoryChangesProps {
  products: Product[];
}

export function RecentInventoryChanges({
  products,
}: RecentInventoryChangesProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (products.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No recent inventory changes.
      </div>
    );
  }

  // Order by last updated
  const sortedProducts = products
    .filter((product) => {
      const updatedAt = new Date(product.updatedAt ?? 0).getTime();
      const now = Date.now();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      return now - updatedAt <= oneDayInMs;
    })
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? 0).getTime() -
        new Date(a.updatedAt ?? 0).getTime()
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Inventory Stock Changes</CardTitle>
        <CardDescription>
          Last inventory stock changes in the past 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2 pr-8">
        <div className="space-y-8">
          {sortedProducts.map((product) => {
            const updatedAt = new Date(product.updatedAt ?? 0);
            const timeAgo =
              currentTime.getTime() - updatedAt.getTime() < 60000
                ? "Just Now"
                : formatDistanceToNow(updatedAt, { addSuffix: true });
            return (
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {product.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Stock increased by {product.totalStock}
                  </p>
                </div>
                <div className="ml-auto font-medium">{timeAgo}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
