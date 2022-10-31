import { PartialType, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { Product } from "@for-noru/models";

export class FindProductsDto extends PickType(PartialType(Product), ['name']) {
  @IsOptional()
  @Transform(({ value }) => value.map((price) => +price))
  @IsNumber({ allowNaN: false }, { each: true })
  priceRange: [number, number];
}
