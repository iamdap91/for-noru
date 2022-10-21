import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Product } from './product.entity';
import { CommonEntity } from '../common.entity';

@Entity()
export class ProductOption extends CommonEntity {
  @ApiProperty()
  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @Transform(({ value }) => +value)
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @Column({ type: 'int' })
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ApiProperty()
  @IsString()
  @Column({ type: 'varchar', nullable: true })
  color?: string;

  @Transform(({ value }) => +value)
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @Column({ type: 'int', unsigned: true })
  stock: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.options)
  product: Product;
}
