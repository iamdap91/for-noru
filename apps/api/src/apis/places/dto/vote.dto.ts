import {IsEnum, IsNumber, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VOTE_CAST_TYPE, VOTE_TYPE } from '@for-noru/common';

export class VoteDto {
  @ApiProperty()
  @IsNumber()
  code: number;

  @ApiProperty()
  @IsString()
  deviceId: string;

  @ApiProperty()
  @IsEnum(VOTE_TYPE)
  voteType: VOTE_TYPE;

  @ApiProperty()
  @IsEnum(VOTE_CAST_TYPE)
  castType: VOTE_CAST_TYPE;
}
