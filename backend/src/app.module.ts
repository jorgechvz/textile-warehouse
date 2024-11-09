import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { ProductionOrderModule } from './production-order/production-order.module';
import { SupplierModule } from './supplier/supplier.module';
import { WarehouseLocationModule } from './warehouse-location/warehouse-location.module';
import { WarehouseManagerModule } from './warehouse-manager/warehouse-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoryModule,
    ProductionOrderModule,
    SupplierModule,
    WarehouseLocationModule,
    WarehouseManagerModule,
  ],
})
export class AppModule {}
