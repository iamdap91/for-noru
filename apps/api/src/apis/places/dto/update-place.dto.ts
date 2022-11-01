import { PartialType } from '@nestjs/mapped-types';
import { Place } from '@for-noru/models';
import { PickType } from '@nestjs/swagger';

export class UpdatePlaceDto extends PickType(PartialType(Place), [
  'type',
  'name',
  'postalCode',
  'address',
  'roadAddress',
  'coordinates',
]) {}
