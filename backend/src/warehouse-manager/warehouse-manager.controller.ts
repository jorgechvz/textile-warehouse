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
import { WarehouseManagerService } from './warehouse-manager.service';
import { CreateWarehouseManagerDto } from './dto/create-warehouse-manager.dto';
import { UpdateWarehouseManagerDto } from './dto/update-warehouse-manager.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WarehouseManagerEntity } from './entities/warehouse-manager.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('warehouse-manager')
@ApiTags('Warehouse Managers')
export class WarehouseManagerController {
  constructor(
    private readonly warehouseManagerService: WarehouseManagerService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: WarehouseManagerEntity,
    description: 'Create a new warehouse manager from user id',
  })
  async create(@Body() createWarehouseManagerDto: CreateWarehouseManagerDto) {
    return new WarehouseManagerEntity(
      await this.warehouseManagerService.create(createWarehouseManagerDto),
    );
  }

  @Get()
  @ApiOkResponse({
    type: [WarehouseManagerEntity],
    description: 'Get all warehouse managers with warehouses',
  })
  async findAll() {
    const warehouseManagers = await this.warehouseManagerService.findAll();
    return warehouseManagers.map(
      (warehouseManager) => new WarehouseManagerEntity(warehouseManager),
    );
  }

  @Get(':id')
  @ApiOkResponse({
    type: WarehouseManagerEntity,
    description: 'Get a warehouse manager by id',
  })
  async findOne(@Param('id') id: string) {
    return new WarehouseManagerEntity(
      await this.warehouseManagerService.findOne(id),
    );
  }

  @Patch(':id')
  @ApiCreatedResponse({
    type: WarehouseManagerEntity,
    description: 'Update a warehouse manager by id',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateWarehouseManagerDto: UpdateWarehouseManagerDto,
  ) {
    return new WarehouseManagerEntity(
      await this.warehouseManagerService.update(id, updateWarehouseManagerDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: WarehouseManagerEntity,
    description: 'Delete a warehouse manager by id',
  })
  async remove(@Param('id') id: string) {
    return new WarehouseManagerEntity(
      await this.warehouseManagerService.remove(id),
    );
  }
}
