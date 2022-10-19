import { ApiProperty, PickType } from '@nestjs/swagger';
import { ProductOption } from '../../../models';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpsertProductOptionDto {
  @ApiProperty({ type: () => Option, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => Option)
  options: Option[];
}

class Option extends PickType(ProductOption, [
  'name',
  'price',
  'description',
  'color',
  'stock',
  'productId',
]) {}
