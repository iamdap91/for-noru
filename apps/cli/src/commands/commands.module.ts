import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ElasticsearchConfigModule,
  ElasticsearchConfigService,
  PostgresConfigModule,
  PostgresConfigService,
  QueueConfigModule,
  QueueConfigService,
  PLACE_SCRAPER_QUEUE,
} from '@for-noru/config';
import {
  PlaceCommand,
  PlaceCreateCommand,
  PlaceScrapeCommand,
  PlaceScrapeAllCommand,
} from './place';
import { QueueCommand, QueuePushPlaceCommand } from './queue';
import { Place } from '@for-noru/models';
import { BullModule } from '@nestjs/bull';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    PostgresConfigModule,
    QueueConfigModule,
    ElasticsearchConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    TypeOrmModule.forFeature([Place]),
    BullModule.registerQueueAsync({
      name: PLACE_SCRAPER_QUEUE,
      useClass: QueueConfigService,
    }),
    ElasticsearchModule.registerAsync({
      useExisting: ElasticsearchConfigService,
    }),
  ],
  providers: [
    PlaceCommand,
    PlaceCreateCommand,
    PlaceScrapeCommand,
    PlaceScrapeAllCommand,
    QueueCommand,
    QueuePushPlaceCommand,
  ],
})
export class CommandsModule {}
