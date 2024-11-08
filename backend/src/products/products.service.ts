import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const { inventoryItems, ...productData } = createProductDto;
    const product = await this.prisma.product.create({
      data: {
        ...productData,
        inventoryItems: {
          create: inventoryItems,
        },
      },
    });
    return product;
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        inventoryItems: true,
        category: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        inventoryItems: true,
        category: true,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { inventoryItems, ...productData } = updateProductDto;
    return await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        inventoryItems: {
          create: inventoryItems,
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
