import { Injectable } from '@nestjs/common';
import { CreateWarehouseManagerDto } from './dto/create-warehouse-manager.dto';
import { UpdateWarehouseManagerDto } from './dto/update-warehouse-manager.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WarehouseManagerService {
  constructor(private prisma: PrismaService) {}
  create(createWarehouseManagerDto: CreateWarehouseManagerDto) {
    return this.prisma.warehouseManager.create({
      data: createWarehouseManagerDto,
    });
  }

  findAll() {
    return this.prisma.warehouseManager.findMany({
      include: {
        warehouses: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.warehouseManager.findUnique({
      where: {
        id,
      },
      include: {
        warehouses: true,
      },
    });
  }

  update(id: string, updateWarehouseManagerDto: UpdateWarehouseManagerDto) {
    return this.prisma.warehouseManager.update({
      where: {
        id,
      },
      data: updateWarehouseManagerDto,
    });
  }

  remove(id: string) {
    return this.prisma.warehouseManager.delete({
      where: {
        id,
      },
    });
  }
}
