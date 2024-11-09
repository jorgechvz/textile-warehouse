import { Module } from '@nestjs/common';
import { WarehouseManagerService } from './warehouse-manager.service';
import { WarehouseManagerController } from './warehouse-manager.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [WarehouseManagerController],
  providers: [WarehouseManagerService],
  imports: [PrismaModule],
  exports: [WarehouseManagerService],
})
export class WarehouseManagerModule {}
