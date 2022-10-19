import { ApiProperty, PickType } from '@nestjs/swagger';
import { Product, ProductOption } from '../../../models';
import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto extends PickType(Product, [
  'name',
  'description',
  'manufacturer',
  'price',
  'images',
]) {
  @ApiProperty({ type: () => Option, isArray: true })
  @ValidateNested()
  @Type(() => Option)
  options: Option[];
}

export class Option extends PickType(ProductOption, ['name', 'color']) {
  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  stock: number;
}
