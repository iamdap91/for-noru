import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Restaurant } from '@gong-gu/models';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>
  ) {}

  async bulkInsert(restaurants: Partial<Restaurant>[]) {
    await this.repository.insert(restaurants).catch((e) => Logger.error(e));
  }

  async create(restaurant: Partial<Restaurant>) {
    await this.repository.insert(restaurant).catch((e) => Logger.error(e));
  }

  async upsert(restaurant: Partial<Restaurant>) {
    await this.repository.save(restaurant).catch((e) => Logger.error(e));
  }

  async update(id: number, restaurant: Partial<Restaurant>) {
    await this.repository.update(id, restaurant).catch((e) => Logger.error(e));
  }

  async findOne(query: FindOneOptions<Restaurant>) {
    return await this.repository.findOne(query);
  }
}
