import { Injectable } from '@nestjs/common';
import { CreateWarehouseLocationDto } from './dto/create-warehouse-location.dto';
import { UpdateWarehouseLocationDto } from './dto/update-warehouse-location.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WarehouseLocationService {
  constructor(private prisma: PrismaService) {}
  async create(createWarehouseLocationDto: CreateWarehouseLocationDto) {
    return await this.prisma.warehouseLocation.create({
      data: createWarehouseLocationDto,
    });
  }

  findAll() {
    return this.prisma.warehouseLocation.findMany();
  }

  findOne(id: string) {
    return this.prisma.warehouseLocation.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateWarehouseLocationDto: UpdateWarehouseLocationDto,
  ) {
    return await this.prisma.warehouseLocation.update({
      where: { id },
      data: updateWarehouseLocationDto,
    });
  }

  remove(id: string) {
    return this.prisma.warehouseLocation.delete({
      where: {
        id,
      },
    });
  }

  findWarehouseCount() {
    return this.prisma.warehouseLocation.count();
  }
}
