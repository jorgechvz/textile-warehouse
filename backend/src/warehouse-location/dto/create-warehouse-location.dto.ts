import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InventoryItemDto } from 'src/products/dto/create-product.dto';

export class CreateWarehouseLocationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  warehouseCode: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  capacity?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notes?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  warehouseManagerId: string;
}

export class GetWarehouseProductsDto extends CreateWarehouseLocationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  products: InventoryItemDto[];
}
