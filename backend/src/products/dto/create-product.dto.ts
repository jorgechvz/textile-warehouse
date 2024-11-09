import { ApiProperty } from '@nestjs/swagger';
import { InventoryStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class InventoryItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({ enum: InventoryStatus })
  @IsNotEmpty()
  @IsEnum(InventoryStatus)
  status: InventoryStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  locationId: string;
}

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(13, 13)
  sku: string;

  @ApiProperty({ type: [InventoryItemDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItemDto)
  inventoryManagement: InventoryItemDto[];

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;
}
