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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierEntity } from './entities/supplier.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('supplier')
@ApiTags('Supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiCreatedResponse({
    type: SupplierEntity,
    description: 'Create a supplier',
  })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @ApiOkResponse({
    type: [SupplierEntity],
    description: 'List of suppliers',
  })
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: SupplierEntity,
    description: 'Find a supplier by id',
  })
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SupplierEntity })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SupplierEntity })
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
