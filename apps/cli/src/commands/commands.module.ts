import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgresConfigModule,
  PostgresConfigService,
  QueueConfigModule,
} from '@gong-gu/config';
import { BackendRestaurantsModule } from '@gong-gu/backend/restaurants';
import {
  RestaurantCommand,
  RestaurantCreateCommand,
  RestaurantScrapeCommand,
  RestaurantScrapeAllCommand,
} from './restaurants';
import { QueueCommand, QueuePushRestaurantsCommand } from './queue';

@Module({
  imports: [
    PostgresConfigModule,
    BackendRestaurantsModule,
    QueueConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
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
