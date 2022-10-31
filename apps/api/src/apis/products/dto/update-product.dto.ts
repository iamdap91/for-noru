import { Product } from '@for-noru/models';
import { PickType } from '@nestjs/swagger';

export class UpdateProductDto extends PickType(Product, [
  'name',
  'description',
  'manufacturer',
  'price',
  'images',
]) {}
