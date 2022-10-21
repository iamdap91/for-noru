import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Restaurant } from '@gong-gu/models';
import { InjectRepository } from '@nestjs/typeorm';

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
}
