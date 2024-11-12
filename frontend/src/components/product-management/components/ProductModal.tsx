import { useInventory } from "@/components/inventory/hooks/use-inventory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MinusCircle, Plus, PlusCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { ProductFormSchema, ProductFormType } from "../types/products.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/components/category/hooks/use-category";
import { Card, CardContent } from "@/components/ui/card";
import { useWarehouse } from "@/components/warehouse/hooks/use-warehouse";
import { useState } from "react";

export default function ProductModal() {
  const { addProductMutation } = useInventory();
  const [open, setOpen] = useState(false);
  const form = useForm<ProductFormType>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      categoryId: "",
      inventoryManagement: [],
    },
  });

  const { queryCategories } = useCategory();
  const { queryWarehouseLocations } = useWarehouse();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "inventoryManagement",
  });
  const onSubmit = async (data: ProductFormType) => {
    const formattedData = {
      ...data,
      inventoryManagement: data.inventoryManagement.map((item) => ({
        ...item,
        stock: Number(item.stock),
      })),
    };
    await addProductMutation.mutateAsync(formattedData);
  };
  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setOpen(open);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] 2xl:max-h-[750px]  max-h-[500px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Enter the details of the new product you want to add.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-right">
                      Name
                    </FormLabel>
                    <Input id="name" {...field} className="col-span-3" />
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="sku" className="text-right">
                      SKU
                    </FormLabel>
                    <Input id="sku" {...field} className="col-span-3" />
                    {form.formState.errors.sku && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.sku.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description" className="text-right">
                    Description
                  </FormLabel>
                  <Textarea
                    placeholder="Add a description for the product"
                    className="resize-none col-span-3 h-[100px]"
                    {...field}
                  />
                  {form.formState.errors.description && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="category" className="text-right">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {queryCategories.data?.map((category) => (
                        <SelectItem key={category.id} value={category.id || ""}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.categoryId && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.categoryId.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Inventory Management</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({ stock: "", locationId: "", status: "IN_STOCK" })
                  }
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Location
                </Button>
              </div>
              {fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`inventoryManagement.${index}.locationId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {queryWarehouseLocations.data?.map(
                                  (location) => (
                                    <SelectItem
                                      key={location.id}
                                      value={location.id || ""}
                                    >
                                      {location.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            {form.formState.errors.inventoryManagement &&
                              form.formState.errors.inventoryManagement[index]
                                ?.locationId && (
                                <p className="text-red-500 text-sm">
                                  {
                                    form.formState.errors.inventoryManagement[
                                      index
                                    ]?.locationId.message
                                  }
                                </p>
                              )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`inventoryManagement.${index}.stock`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Stock" />
                            </FormControl>
                            {form.formState.errors.inventoryManagement &&
                              form.formState.errors.inventoryManagement[index]
                                ?.stock && (
                                <p className="text-red-500 text-sm">
                                  {
                                    form.formState.errors.inventoryManagement[
                                      index
                                    ]?.stock.message
                                  }
                                </p>
                              )}
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`inventoryManagement.${index}.status`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="IN_STOCK">In Stock</SelectItem>
                              <SelectItem value="LOW_STOCK">
                                Low Stock
                              </SelectItem>
                              <SelectItem value="OUT_OF_STOCK">
                                Out of Stock
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.inventoryManagement &&
                            form.formState.errors.inventoryManagement[index]
                              ?.status && (
                              <p className="text-red-500 text-sm">
                                {
                                  form.formState.errors.inventoryManagement[
                                    index
                                  ]?.status.message
                                }
                              </p>
                            )}
                        </FormItem>
                      )}
                    />
                    {fields.length > 1 && index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-4"
                        onClick={() => remove(index)}
                      >
                        <MinusCircle className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
