import { ApiProperty } from '@nestjs/swagger';
import { Product, Supplier } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SupplierEntity implements Supplier {
  constructor(partial: Partial<SupplierEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  contactInfo: string;

  @ApiProperty()
  @Exclude()
  products: Product[];

  @ApiProperty()
  @Exclude()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;
}
