import { CommonEntity } from '../common.entity';
import { Column, Entity, Index } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class Place extends CommonEntity {
  @IsString()
  @Column({ type: 'varchar' })
  type: string;

  @Index({ unique: true })
  @IsString()
  @Column({ type: 'varchar' })
  manageId: string;

  @Index()
  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @IsString()
  @Column({ type: 'int', nullable: true })
  postalCode?: number;

  @IsString()
  @Column({ type: 'varchar' })
  address: string;

  @IsString()
  @Column({ type: 'varchar' })
  roadAddress?;

  @IsOptional()
  @IsString({ each: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  coordinates?: [string, string];

  @Index()
  @IsString()
  @Column({ type: 'boolean' })
  active: boolean;
}
