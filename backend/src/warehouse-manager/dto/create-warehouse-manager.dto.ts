import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWarehouseManagerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

