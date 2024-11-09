import { ApiProperty } from '@nestjs/swagger';
import { InventoryItem, WarehouseLocation } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class WarehouseLocationEntity implements WarehouseLocation {

  constructor(partial: Partial<WarehouseLocationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  warehouseCode: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  @Exclude()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  warehouseManagerId: string;

  @ApiProperty()
  @Exclude()
  products: InventoryItem[];
}

