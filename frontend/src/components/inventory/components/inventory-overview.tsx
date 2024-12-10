import { useWarehouse } from "@/components/warehouse/hooks/use-warehouse";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import InventoryCards from "./inventory-cards";
import InventoryTable from "./inventory-table";

export default function InventoryOverview() {
  const { queryWarehouses } = useWarehouse();
  if (!queryWarehouses) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }
  const warehouseLocations = queryWarehouses.data || [];
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    if (warehouseLocations.length > 0 && !value) {
      setValue(warehouseLocations[0].name);
    }
  }, [warehouseLocations, value]);
  const [open, setOpen] = useState<boolean>(false);

  const filterWarehouse = warehouseLocations.find(
    (warehouse) => warehouse.name === value
  );
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="space-y-2 w-[300px]">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="select-41"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
              >
                <span
                  className={cn("truncate", !value && "text-muted-foreground")}
                >
                  {value
                    ? warehouseLocations?.find(
                        (warehouse) => warehouse.name === value
                      )?.name
                    : "Select warehouse"}
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 text-muted-foreground/80"
                  aria-hidden="true"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Search warehouse..." />
                <CommandList>
                  <CommandEmpty>No warehouse found.</CommandEmpty>
                  <CommandGroup>
                    {warehouseLocations?.map((warehouse) => (
                      <CommandItem
                        key={warehouse.id}
                        value={warehouse.name}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        {warehouse.name}
                        {value === warehouse.name && (
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="ml-auto"
                          />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <InventoryCards warehouseId={filterWarehouse?.id || ""} />
      </div>
      <InventoryTable warehouseId={filterWarehouse?.id || ""} />
    </div>
  );
}
