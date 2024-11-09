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
        inventoryManagement: true,
        category: true,
      },
    });
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
    const newTotalStock = inventoryItems.reduce((sum, item) => sum + item.stock, 0);

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        totalStock: newTotalStock,
      },
    });
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
