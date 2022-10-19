import { PickType } from '@nestjs/swagger';
import { Product } from '../../../models';

export class UpdateProductDto extends PickType(Product, [
  'name',
  'description',
  'manufacturer',
  'price',
  'images',
]) {}
