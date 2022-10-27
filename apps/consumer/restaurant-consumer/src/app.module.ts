import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgresConfigModule,
  PostgresConfigService,
  QueueConfigModule,
  RESTAURANTS_QUEUE_NAME,
} from '@gong-gu/config';
import { RestaurantScrapeConsumer } from './restaurant-scrape.consumer';
import { BullModule } from '@nestjs/bull';
import { Restaurant } from '@gong-gu/models';

@Module({
  imports: [
    PostgresConfigModule,
    QueueConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    TypeOrmModule.forFeature([Restaurant]),
    BullModule.registerQueue({
      name: RESTAURANTS_QUEUE_NAME,
      redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: +process.env.REDIS_PORT || 6379,
      },
    }),
  ],
  providers: [RestaurantScrapeConsumer],
})
export class AppModule {}
