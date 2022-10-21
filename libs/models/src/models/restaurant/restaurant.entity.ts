import { CommonEntity } from '../common.entity';
import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class Restaurant extends CommonEntity {
  @IsString()
  @Column({ type: 'varchar' })
  type: string;

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

  @IsString()
  @Column({ type: 'timestamp' })
  lastUpdated: Date;

  @IsString()
  @Column({ type: 'boolean' })
  active: boolean;
}
