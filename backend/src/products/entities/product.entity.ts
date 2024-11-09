import { ApiProperty } from '@nestjs/swagger';
import { InventoryItem, Product, Supplier } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { InventoryItemDto } from '../dto/create-product.dto';

export class ProductEntity implements Product {
  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  totalStock: number;
  
  @ApiProperty()
  @Exclude()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  categoryId: string;

  @ApiProperty({ type: [InventoryItemDto] })
  @Type(() => InventoryItemDto)
  inventoryItems: InventoryItem[];

  @ApiProperty()
  @Exclude()
  suppliers: Supplier[];
}
