import { CommonEntity } from '../common.entity';
import { Column, Entity, Index } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class Restaurant extends CommonEntity {
  @IsString()
  @Column({ type: 'varchar' })
  type: string;

  @Index({ unique: true })
  @IsString()
  @Column({ type: 'varchar' })
  manageId: string;

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

  @IsString()
  @Column({ type: 'varchar' })
  xCoordinate: string;

  @IsString()
  @Column({ type: 'varchar' })
  yCoordinate: string;

  @Index()
  @IsString()
  @Column({ type: 'boolean' })
  active: boolean;
}
