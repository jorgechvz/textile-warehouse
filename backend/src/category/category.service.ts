import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });
    return category;
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findCategoryById(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: { id },
      data: {
        name: updateCategoryDto.name,
      },
    });
    return category;
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
