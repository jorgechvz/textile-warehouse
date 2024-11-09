import { Module } from '@nestjs/common';
import { WarehouseLocationService } from './warehouse-location.service';
import { WarehouseLocationController } from './warehouse-location.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [WarehouseLocationController],
  providers: [WarehouseLocationService],
  imports: [PrismaModule],
  exports: [WarehouseLocationService],
})
export class WarehouseLocationModule {}
