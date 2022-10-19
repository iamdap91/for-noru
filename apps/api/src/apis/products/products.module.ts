import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductOption } from '../../models';
import { ProductOptionsController } from './product-options.controller';
import { ProductOptionsService } from './product-options.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOption])],
  controllers: [ProductsController, ProductOptionsController],
  providers: [ProductsService, ProductOptionsService],
})
export class ProductsModule {}
