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

  async upsert(restaurant: Partial<Restaurant>) {
    try {
      await this.repository.save(restaurant);
    } catch (e) {
      Logger.error(e);
    }
  }
}
