import { Queue } from 'bull';
import { FindManyOptions, Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { InjectQueue } from '@nestjs/bull';
import { Restaurant } from '@gong-gu/models';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>,
    @InjectQueue('restaurants')
    private readonly queue: Queue
  ) {}

  async addQueue(id: number) {
    await this.queue.add(id, { jobId: id });
  }

  async find(options: FindManyOptions) {
    return await this.repository.find(options);
  }

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
