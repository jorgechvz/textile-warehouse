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
  @ApiCreatedResponse({ type: CategoryEntity, description: 'Create a category' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return new CategoryEntity(
      await this.categoryService.create(createCategoryDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: [CategoryEntity], description: 'List of categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CategoryEntity,
    description: 'Find a category by id with products',
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findCategoryById(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CategoryEntity })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
