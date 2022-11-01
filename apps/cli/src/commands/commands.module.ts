import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ElasticsearchConfigModule,
  ElasticsearchConfigService,
  PostgresConfigModule,
  PostgresConfigService,
  QueueConfigModule,
  QueueConfigService,
  STANDARD_PLACE_QUEUE_NAME,
} from '@for-noru/config';
import {
  PlaceCommand,
  PlaceCreateCommand,
  PlaceScrapeCommand,
  PlaceScrapeAllCommand,
} from './place';
import { QueueCommand, QueuePushPlaceCommand } from './queue';
import { NaverPlace, StandardPlace } from '@for-noru/models';
import { BullModule } from '@nestjs/bull';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    PostgresConfigModule,
    QueueConfigModule,
    ElasticsearchConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    TypeOrmModule.forFeature([StandardPlace, NaverPlace]),
    BullModule.registerQueueAsync({
      name: STANDARD_PLACE_QUEUE_NAME,
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
