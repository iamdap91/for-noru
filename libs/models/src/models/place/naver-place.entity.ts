import { CommonEntity } from '../common.entity';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { StandardPlace } from './standard-place.entity';

@Entity()
export class NaverPlace extends CommonEntity {
  @IsString()
  @Column({ type: 'varchar' })
  type: string;

  @Index({ unique: true })
  @IsNumber()
  @Column({ type: 'int' })
  code: number;

  @Index()
  @IsString()
  @Column({ type: 'boolean' })
  active: boolean;

  @Index()
  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @IsString()
  @Column({ type: 'varchar' })
  address: string;

  @IsOptional()
  @IsString({ each: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  coordinates?: [string, string];

  @IsOptional()
  @IsString({ each: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  images?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  categories?: string[];

  @IsString()
  @Column({ type: 'varchar' })
  description: string;

  @Index()
  @IsString()
  @Column({ type: 'boolean' })
  petAllowed: boolean;

  @OneToOne(() => StandardPlace, (standardPlace) => standardPlace.place)
  standardPlace: StandardPlace;
}
