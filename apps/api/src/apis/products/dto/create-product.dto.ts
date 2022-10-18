import { PickType } from '@nestjs/swagger';
import { Product, ProductOption } from '../../../models';
import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto extends PickType(Product, [
  'name',
  'description',
  'manufacturer',
  'price',
  'imageUrl',
]) {
  @ValidateNested()
  @Type(() => Option)
  options: Option[];
}

export class Option extends PickType(ProductOption, ['name', 'color']) {
  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}
