import { ApiProperty, PickType } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductOption } from '@for-noru/models';

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
