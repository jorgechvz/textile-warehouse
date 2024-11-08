import { ApiProperty } from '@nestjs/swagger';
import { InventoryStatus } from '@prisma/client';

export class CreateInventoryItemDto {
  @ApiProperty()
  stock: number;
  @ApiProperty()
  status: InventoryStatus;
  @ApiProperty()
  location: string;
}

export class CreateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  sku: string;
  @ApiProperty()
  inventoryItems: CreateInventoryItemDto[];
  @ApiProperty()
  categoryId: string;
}
