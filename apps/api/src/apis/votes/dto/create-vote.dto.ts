import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VOTE_CAST_TYPE, VOTE_TYPE } from '@for-noru/common';

export class CreateVoteDto {
  @ApiProperty()
  @IsString()
  id: string;

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
