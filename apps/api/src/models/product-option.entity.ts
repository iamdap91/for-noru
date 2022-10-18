import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { CommonEntity } from './common.entity';

@Entity()
export class ProductOption extends CommonEntity {
  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @IsNumber()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @Column({ type: 'int' })
  price: number;

  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  color?: string;

  @IsNumber()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @Column({ type: 'int', unsigned: true })
  stock: number;

  @ManyToOne(() => Product, (product) => product.options)
  product: Product;
}
