import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useInventoryItems } from "../hooks/use-inventory";
import { useCategory } from "@/components/category/hooks/use-category";
import InventoryPagination from "./inventory-pagination-table";

interface InventoryTableProps {
  warehouseId: string;
}

const InventoryTable = ({ warehouseId }: InventoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { inventoryItemsByWarehouseIdQuery } = useInventoryItems(
    warehouseId,
    page,
    pageSize
  );
  const { queryCategories } = useCategory();

  const { isLoading, isError, data } = inventoryItemsByWarehouseIdQuery;

  if (isLoading) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-2xl font-bold text-red-500">Error loading data</div>
    );
  }

  const inventoryItems = Array.isArray(data.items) ? data.items : [];
  const totalPages = data.totalPages || 1;

  const filteredInventory = inventoryItems.filter((item) => {
    const matchesSearchTerm = item.product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || categoryFilter === ""
        ? true
        : item.product.category.name === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || !statusFilter
        ? true
        : item.status === statusFilter;

    return matchesSearchTerm && matchesCategory && matchesStatus;
  });

  const formatStatus = (status: string) => {
    switch (status) {
      case "IN_STOCK":
        return "In Stock";
      case "LOW_STOCK":
        return "Low Stock";
      case "OUT_OF_STOCK":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {queryCategories?.data?.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="IN_STOCK">In Stock</SelectItem>
                <SelectItem value="LOW_STOCK">Low Stock</SelectItem>
                <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.sku}</TableCell>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.product.category.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{formatStatus(item.status)}</TableCell>
                <TableCell>
                  {new Date(item.updatedAt || "").toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <InventoryPagination
          totalPages={totalPages}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
