import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('category')
@Controller('Product Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiCreatedResponse({
    type: CategoryEntity,
    description: 'Create a category',
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return new CategoryEntity(
      await this.categoryService.create(createCategoryDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: [CategoryEntity], description: 'List of categories' })
  async findAll() {
    const categories = await this.categoryService.findAll();
    return categories.map((category) => new CategoryEntity(category));
  }

  @Get(':id')
  @ApiOkResponse({
    type: CategoryEntity,
    description: 'Find a category by id with products',
  })
  async findOne(@Param('id') id: string) {
    return new CategoryEntity(await this.categoryService.findCategoryById(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return new CategoryEntity(
      await this.categoryService.update(id, updateCategoryDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: CategoryEntity })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return new CategoryEntity(await this.categoryService.remove(id));
  }
}
