import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Between, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfIsNil } from '@for-noru/common';
import {
  UpdateProductDto,
  CreateProductDto,
  UpsertProductOptionDto,
  FindProductsDto,
} from './dto';
import { Product, ProductOption } from '@for-noru/models';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductOption)
    private readonly productOptionRepo: Repository<ProductOption>
  ) {}

  async create(createProductDto: CreateProductDto) {
    await this.productRepo.save(createProductDto, { transaction: true });
  }

  async find({ name, priceRange }: FindProductsDto) {
    return await this.productRepo.find({
      where: {
        name: name ? Like(`%${name}%`) : undefined,
        price: priceRange ? Between(priceRange[0], priceRange[1]) : undefined,
      },
      order: { id: -1 },
    });
  }

  async findOne(id: number) {
    return await this.productRepo
      .findOne({ where: { id } })
      .then(throwIfIsNil(new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)));
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo
      .findOne({ where: { id } })
      .then(throwIfIsNil(new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)));

    await this.productRepo.save({ ...product, ...updateProductDto });
  }

  async remove(id: number) {
    await this.productRepo.softDelete(id);
  }

  async findOptions(id: number) {
    return await this.productOptionRepo.find({
      where: { productId: id },
      order: { id: -1 },
    });
  }

  async upsertOptions(id: number, { options }: UpsertProductOptionDto) {
    // 옵션을 업데이트 하기 전 상품이 있는지 여부 체크
    await this.productRepo
      .findOne({ where: { id } })
      .then(throwIfIsNil(new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)));

    await this.productOptionRepo.manager.transaction(
      'SERIALIZABLE',
      async (manager) => {
        for (const option of options) {
          await manager.save(ProductOption, option);
        }
      }
    );
  }
}
