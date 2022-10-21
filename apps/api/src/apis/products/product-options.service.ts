import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOption } from '@gong-gu/models';

@Injectable()
export class ProductOptionsService {
  constructor(
    @InjectRepository(ProductOption)
    private readonly productOptionRepo: Repository<ProductOption>
  ) {}

  async remove(id: number) {
    await this.productOptionRepo.softDelete(id);
  }
}
