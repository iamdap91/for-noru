import { CommonEntity } from '../common.entity';
import { Column, Entity, Index } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Place extends CommonEntity {
  @ApiProperty()
  @IsString()
  @Column({ type: 'varchar' })
  type: string;

  @ApiProperty()
  @Index({ unique: true })
  @IsString()
  @Column({ type: 'varchar' })
  manageId: string;

  @ApiProperty()
  @Index()
  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @IsString()
  @Column({ type: 'int', nullable: true })
  postalCode?: number;

  @ApiProperty()
  @IsString()
  @Column({ type: 'varchar' })
  address: string;

  @ApiProperty()
  @IsString()
  @Column({ type: 'varchar' })
  roadAddress?;

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  coordinates?: [string, string];

  @ApiProperty()
  @Index()
  @IsString()
  @Column({ type: 'boolean' })
  active: boolean;
}
