import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ActiveProductionOrders() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Active Production Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">18</div>
        <p className="text-xs text-muted-foreground">6 completed this week</p>
      </CardContent>
    </Card>
  );
}
