import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const { inventoryManagement, ...productData } = createProductDto;

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        totalStock: inventoryManagement.reduce(
          (sum, item) => sum + item.stock,
          0,
        ),
        inventoryManagement: {
          create: inventoryManagement.map((item) => ({
            stock: item.stock,
            status: item.status,
            warehouseLocation: { connect: { id: item.locationId } },
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
      },
    });

    return product;
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        inventoryManagement: {
          include: {
            warehouseLocation: true,
          },
        },
        category: true,
      },
    });
  }

  async findAllWithPagination(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take,
        include: {
          inventoryManagement: {
            include: {
              warehouseLocation: true,
            },
          },
          category: true,
        },
      }),
      this.prisma.product.count(),
    ]);
    return {
      data: products,
      total,
      page,
      pageSize,
    };
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        inventoryManagement: true,
        category: true,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { inventoryManagement, ...productData } = updateProductDto;

    for (const item of inventoryManagement) {
      await this.prisma.inventoryItem.upsert({
        where: {
          productId_locationId: {
            productId: id,
            locationId: item.locationId,
          },
        },
        update: {
          stock: item.stock,
          status: item.status,
          updatedAt: new Date(),
        },
        create: {
          product: { connect: { id } },
          stock: item.stock,
          status: item.status,
          warehouseLocation: { connect: { id: item.locationId } },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    const inventoryItems = await this.prisma.inventoryItem.findMany({
      where: { productId: id },
    });
    const newTotalStock = inventoryItems.reduce(
      (sum, item) => sum + item.stock,
      0,
    );

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        totalStock: newTotalStock,
      },
    });
  }

  private async updateProductTotalStock(productId: string) {
    const inventoryItems = await this.prisma.inventoryItem.findMany({
      where: { productId },
    });

    const newTotalStock = inventoryItems.reduce(
      (sum, item) => sum + item.stock,
      0,
    );

    // Actualizar el totalStock del Product
    return await this.prisma.product.update({
      where: { id: productId },
      data: { totalStock: newTotalStock },
    });
  }

  async addStock(inventoryItemId: string, stock: number) {
    const inventoryItem = await this.prisma.inventoryItem.findUnique({
      where: { id: inventoryItemId },
    });
    if (!inventoryItem) {
      throw new Error('Inventory item not found');
    }

    const newStock = inventoryItem.stock + stock;

    // Actualizar el stock del InventoryItem
    await this.prisma.inventoryItem.update({
      where: { id: inventoryItemId },
      data: { stock: newStock },
    });

    // Recalcular el totalStock del producto
    return await this.updateProductTotalStock(inventoryItem.productId);
  }

  async removeStock(inventoryItemId: string, stock: number) {
    const inventoryItem = await this.prisma.inventoryItem.findUnique({
      where: { id: inventoryItemId },
    });
    if (!inventoryItem) {
      throw new Error('Inventory item not found');
    }

    const newStock = inventoryItem.stock - stock;

    // Asegurarse de que el stock no sea negativo
    if (newStock < 0) {
      throw new Error('Stock cannot be negative');
    }

    // Actualizar el stock del InventoryItem
    await this.prisma.inventoryItem.update({
      where: { id: inventoryItemId },
      data: { stock: newStock },
    });

    // Recalcular el totalStock del producto
    return await this.updateProductTotalStock(inventoryItem.productId);
  }

  async addStockBySkuAndLocation(sku: string, locationId: string) {
    const product = await this.prisma.product.findUnique({
      where: { sku },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    const inventoryItem = await this.prisma.inventoryItem.findUnique({
      where: { productId_locationId: { productId: product.id, locationId } },
    });
    if (!inventoryItem) {
      throw new Error('Inventory item not found');
    }

    const newStock = inventoryItem.stock + 1;

    // Actualizar el stock del InventoryItem
    await this.prisma.inventoryItem.update({
      where: { id: inventoryItem.id },
      data: { stock: newStock },
    });

    // Recalcular el totalStock del producto
    return await this.updateProductTotalStock(product.id);
  }

  async removeStockBySkuAndLocation(sku: string, locationId: string) {
    const product = await this.prisma.product.findUnique({
      where: { sku },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    const inventoryItem = await this.prisma.inventoryItem.findUnique({
      where: { productId_locationId: { productId: product.id, locationId } },
    });
    if (!inventoryItem) {
      throw new Error('Inventory item not found');
    }

    const newStock = inventoryItem.stock - 1;

    // Asegurarse de que el stock no sea negativo
    if (newStock < 0) {
      throw new Error('Stock cannot be negative');
    }

    // Actualizar el stock del InventoryItem
    await this.prisma.inventoryItem.update({
      where: { id: inventoryItem.id },
      data: { stock: newStock },
    });

    // Recalcular el totalStock del producto
    return await this.updateProductTotalStock(product.id);
  }

  // Inventory functions to endpoints
  async getInventoryItem(id: string) {
    return this.prisma.inventoryItem.findUnique({
      where: { id },
    });
  }
  async getInventoryOverviewByLocationId(locationId: string) {
    const totalCount = await this.prisma.inventoryItem.count({
      where: { locationId },
    });

    const lowStockCount = await this.prisma.inventoryItem.count({
      where: { locationId, status: 'LOW_STOCK' },
    });

    const outOfStockCount = await this.prisma.inventoryItem.count({
      where: { locationId, status: 'OUT_OF_STOCK' },
    });

    return {
      total: totalCount,
      lowStock: lowStockCount,
      outOfStock: outOfStockCount,
    };
  }

  async getInventoryItemsByWarehouseId(
    locationId: string,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [items, total] = await Promise.all([
      this.prisma.inventoryItem.findMany({
        where: { locationId },
        skip,
        take,
        select: {
          id: true,
          stock: true,
          status: true,
          updatedAt: true,
          product: {
            select: {
              id: true,
              name: true,
              sku: true,
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.inventoryItem.count({
        where: { locationId },
      }),
    ]);

    return {
      items,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async remove(id: string) {
    await this.prisma.inventoryItem.deleteMany({
      where: { productId: id },
    });
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
