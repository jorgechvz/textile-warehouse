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
import { ProductsService } from './products.service';
import {
  AddStockDto,
  CreateProductDto,
  ReduceStockDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity, description: 'Create a product' })
  async create(@Body() createProductDto: CreateProductDto) {
    return new ProductEntity(
      await this.productsService.create(createProductDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: [ProductEntity], description: 'List of products' })
  async findAll() {
    const products = await this.productsService.findAll();
    return products.map((product) => new ProductEntity(product));
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity, description: 'Find a product by id' })
  async findOne(@Param('id') id: string) {
    return new ProductEntity(await this.productsService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return new ProductEntity(
      await this.productsService.update(id, updateProductDto),
    );
  }

  @Patch('inventory/add/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: ProductEntity,
    description: 'Add stock to a product',
  })
  async addStock(@Param('id') id: string, @Body() addStockDto: AddStockDto) {
    return new ProductEntity(
      await this.productsService.addStock(id, addStockDto.stock),
    );
  }

  @Patch('inventory/remove/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: ProductEntity,
    description: 'Reduce stock from a product',
  })
  async reduceStock(
    @Param('id') id: string,
    @Body() reduceStockDto: ReduceStockDto,
  ) {
    return new ProductEntity(
      await this.productsService.removeStock(id, reduceStockDto.stock),
    );
  }

  @Get('inventory/:id')
  @ApiOkResponse({ type: [ProductEntity] })
  async findInventory(@Param('id') id: string) {
    const product = await this.productsService.getInventoryItem(id);
    return new ProductEntity(product);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async remove(@Param('id') id: string) {
    return new ProductEntity(await this.productsService.remove(id));
  }
}
