import { CommonEntity } from '../common.entity';
import { Column, Entity, Index } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class Restaurant extends CommonEntity {
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
  @Column({ type: 'int' })
  postalCode: number;

  @IsString()
  @Column({ type: 'varchar' })
  address: string;

  @IsString()
  @Column({ type: 'varchar' })
  roadAddress;

  @IsOptional()
  @IsString({ each: true })
  @Column({ type: 'int', array: true, nullable: true })
  coordinates?: [number, number];

  @Index()
  @IsString()
  @Column({ type: 'boolean' })
  active: boolean;

  @Index()
  @IsString()
  @Column({ type: 'boolean', default: false })
  petAllowed: boolean;

  @IsOptional()
  @IsString({ each: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  images?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  categories?: string[];
}
