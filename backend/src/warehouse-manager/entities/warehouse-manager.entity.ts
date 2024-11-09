import { ApiProperty } from '@nestjs/swagger';
import { WarehouseManager } from '@prisma/client';

export class WarehouseManagerEntity implements WarehouseManager {
  constructor(partial: Partial<WarehouseManagerEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
