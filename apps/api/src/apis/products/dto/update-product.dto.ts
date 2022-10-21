import { Product } from '@gong-gu/models';
import { PickType } from '@nestjs/swagger';

export class UpdateProductDto extends PickType(Product, [
  'name',
  'description',
  'manufacturer',
  'price',
  'images',
]) {}
