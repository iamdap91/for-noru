import { PartialType } from '@nestjs/mapped-types';
import { Place } from '@for-noru/models';
import { OmitType } from '@nestjs/swagger';

export class UpdatePlaceDto extends PartialType(OmitType(Place, ['id'])) {}
