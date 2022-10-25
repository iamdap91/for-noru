import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgresConfigModule,
  PostgresConfigService,
  QueueConfigModule,
  QueueConfigService,
} from '@gong-gu/config';
import { RestaurantScrapeConsumer } from './restaurant-scrape.consumer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PostgresConfigModule,
    QueueConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    BullModule.registerQueueAsync({
      name: 'restaurants',
      useClass: QueueConfigService,
    }),
  ],
  providers: [RestaurantScrapeConsumer],
})
export class AppModule {}
