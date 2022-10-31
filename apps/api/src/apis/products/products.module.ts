import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOptionsController } from './product-options.controller';
import { ProductOptionsService } from './product-options.service';
import { Product, ProductOption } from '@for-noru/models';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOption])],
  controllers: [ProductsController, ProductOptionsController],
  providers: [ProductsService, ProductOptionsService],
})
export class ProductsModule {}
