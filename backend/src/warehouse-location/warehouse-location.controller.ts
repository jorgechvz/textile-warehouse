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
import { WarehouseLocationService } from './warehouse-location.service';
import { CreateWarehouseLocationDto } from './dto/create-warehouse-location.dto';
import { UpdateWarehouseLocationDto } from './dto/update-warehouse-location.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WarehouseLocationEntity } from './entities/warehouse-location.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('warehouse-location')
@ApiTags('Warehouse Location')
export class WarehouseLocationController {
  constructor(
    private readonly warehouseLocationService: WarehouseLocationService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: WarehouseLocationEntity,
    description: 'Create a new warehouse location',
  })
  async create(@Body() createWarehouseLocationDto: CreateWarehouseLocationDto) {
    return new WarehouseLocationEntity(
      await this.warehouseLocationService.create(createWarehouseLocationDto),
    );
  }

  @Get()
  @ApiOkResponse({
    type: WarehouseLocationEntity,
    description: 'Get all warehouse locations',
  })
  async findAll() {
    const warehouseLocations = await this.warehouseLocationService.findAll();
    return warehouseLocations.map(
      (warehouseLocation) => new WarehouseLocationEntity(warehouseLocation),
    );
  }

  @Get(':id')
  @ApiOkResponse({
    type: WarehouseLocationEntity,
    description: 'Get a warehouse location by id',
  })
  async findOne(@Param('id') id: string) {
    return new WarehouseLocationEntity(
      await this.warehouseLocationService.findOne(id),
    );
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: WarehouseLocationEntity,
    description: 'Update a warehouse location',
  })
  async update(
    @Param('id') id: string,
    @Body() updateWarehouseLocationDto: UpdateWarehouseLocationDto,
  ) {
    return new WarehouseLocationEntity(
      await this.warehouseLocationService.update(
        id,
        updateWarehouseLocationDto,
      ),
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: WarehouseLocationEntity,
    description: 'Delete a warehouse location',
  })
  async remove(@Param('id') id: string) {
    return new WarehouseLocationEntity(
      await this.warehouseLocationService.remove(id),
    );
  }
}
