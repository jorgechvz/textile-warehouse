import { PartialType } from '@nestjs/swagger';
import { CreateWarehouseManagerDto } from './create-warehouse-manager.dto';

export class UpdateWarehouseManagerDto extends PartialType(CreateWarehouseManagerDto) {}
