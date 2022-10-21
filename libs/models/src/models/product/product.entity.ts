import { Column, Entity, Index, OneToMany } from 'typeorm';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CommonEntity } from '../common.entity';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductOption } from './product-option.entity';

@Entity()
export class Product extends CommonEntity {
  @Index()
  @ApiProperty()
  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', nullable: true })
  manufacturer?: string;

  @Index()
  @Transform(({ value }) => +value)
  @ApiProperty()
  @IsNumber()
  @Column({ type: 'int', unsigned: true })
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @Column({ type: 'varchar', array: true, nullable: true })
  images?: string[];

  @ValidateNested({ each: true })
  @Type(() => ProductOption)
  @OneToMany(() => ProductOption, (option) => option.product, {
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
  })
  options: ProductOption[];
}
