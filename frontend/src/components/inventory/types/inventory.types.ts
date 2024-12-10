export enum InventoryStatus {
  IN_STOCK = "IN_STOCK",
  LOW_STOCK = "LOW_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export enum OrderStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type Product = {
  id?: string;
  name: string;
  description?: string;
  sku: string;
  totalStock?: number;
  categoryId: string;
  category: Category;
  createdAt?: Date;
  updatedAt?: Date;
  inventoryManagement: InventoryItem[];
  productionOrders?: ProductionOrder[];
  suppliers?: Supplier[];
};

export type InventoryItem = {
  id?: string;
  productId: string;
  stock: number;
  locationId: string;
  status: InventoryStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type InventoryItemsByLocationId = {
  id?: string;
  stock: number;
  status: InventoryStatus;
  updatedAt?: Date;
  product: Product;
};


export type InventoryOverview = {
  total: number;
  lowStock: number;
  outOfStock: number;
};

export type WarehouseLocation = {
  id?: string;
  name: string;
  address: string;
  postalCode: string;
  warehouseCode: string;
  capacity?: number;
  city: string;
  country: string;
  phone: string;
  notes?: string;
  warehouseManagerId: string;
  products: InventoryItem[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type WarehouseManager = {
  id?: string;
  userId: string;
  warehouses: WarehouseLocation[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductionOrder = {
  id?: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Category = {
  id?: string;
  name: string;
  products: Product[];
};

export type Supplier = {
  id?: string;
  name: string;
  contactInfo?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  products: Product[];
  createdAt?: Date;
  updatedAt?: Date;
};
