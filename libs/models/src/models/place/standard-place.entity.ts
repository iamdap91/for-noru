import { CommonEntity } from '../common.entity';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';
import { NaverPlace } from './index';

@Entity()
export class StandardPlace extends CommonEntity {
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

  @OneToOne(() => NaverPlace, (naverPlace) => naverPlace.standardPlace, {
    cascade: ['insert', 'update', 'soft-remove', 'remove'],
  })
  naverPlace: NaverPlace;
}
