import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgresConfigModule,
  PostgresConfigService,
  QueueConfigModule,
  QueueConfigService,
  RESTAURANTS_QUEUE_NAME,
} from '@gong-gu/config';
import {
  RestaurantCommand,
  RestaurantCreateCommand,
  RestaurantScrapeCommand,
  RestaurantScrapeAllCommand,
} from './restaurants';
import { QueueCommand, QueuePushRestaurantsCommand } from './queue';
import { Restaurant } from '@gong-gu/models';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PostgresConfigModule,
    QueueConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    TypeOrmModule.forFeature([Restaurant]),
    BullModule.registerQueueAsync({
      name: RESTAURANTS_QUEUE_NAME,
      useClass: QueueConfigService,
    }),
  ],
  providers: [
    RestaurantCommand,
    RestaurantCreateCommand,
    RestaurantScrapeCommand,
    RestaurantScrapeAllCommand,
    QueueCommand,
    QueuePushRestaurantsCommand,
  ],
})
export class CommandsModule {}
