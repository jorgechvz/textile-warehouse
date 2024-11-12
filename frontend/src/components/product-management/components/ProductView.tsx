import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useInventory } from "@/components/inventory/hooks/use-inventory";
import ProductModal from "./ProductModal";
import { useCategory } from "@/components/category/hooks/use-category";

const ProductsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { productsQuery } = useInventory();

  const { data: products } = productsQuery;

  const { queryCategories } = useCategory();

  const filteredProducts = products?.filter((item) =>
    categoryFilter === "all" || categoryFilter === ""
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.category.name === categoryFilter
  );

  const sortedProducts = filteredProducts
    ? [...filteredProducts].sort((a, b) => {
        if (sortBy === "all") return 0;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "stock")
          return (a.totalStock ?? 0) - (b.totalStock ?? 0);
        return 0;
      })
    : [];

  const handleEdit = (id: string) => {
    console.log(`Editing product with id: ${id}`);
    // Implementar lógica de edición
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting product with id: ${id}`);
    // Implementar lógica de eliminación
  };

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details of product with id: ${id}`);
    // Implementar lógica para ver detalles
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <ProductModal />
      </div>

      {/* All Products */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Default</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sku</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category.name}</TableCell>
                  <TableCell>{item.totalStock}</TableCell>
                  <TableCell>
                    {new Date(item.updatedAt || "").toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item.id as string)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id as string)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(item.id as string)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsView;
