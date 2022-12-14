import { ApiProperty } from '@nestjs/swagger';
import {IsNumber, IsOptional, IsString} from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchPlaceQuery {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => +value)
  lat: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => +value)
  lon: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category: string;
}
