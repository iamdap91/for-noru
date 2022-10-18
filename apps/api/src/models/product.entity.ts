import { Column, Entity, OneToMany } from 'typeorm';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CommonEntity } from './common.entity';
import { Type } from 'class-transformer';
import { ProductOption } from './product-option.entity';

@Entity()
export class Product extends CommonEntity {
  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', nullable: true })
  manufacturer?: string;

  @IsNumber()
  @Column({ type: 'int', unsigned: true })
  price: number;

  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', nullable: true })
  imageUrl?: string;

  @ValidateNested({ each: true })
  @Type(() => ProductOption)
  @OneToMany(() => ProductOption, (option) => option.product, {
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
  })
  options: ProductOption[];
}
