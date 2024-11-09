import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [PrismaModule],
  exports: [CategoryService],
})
export class CategoryModule {}
