import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgresConfigModule,
  PostgresConfigService,
  QueueConfigModule,
  QueueConfigService,
  STANDARD_PLACE_QUEUE_NAME,
} from '@gong-gu/config';
import {
  PlaceCommand,
  PlaceCreateCommand,
  PlaceScrapeCommand,
  PlaceScrapeAllCommand,
} from './place';
import { QueueCommand, QueuePushPlaceCommand } from './queue';
import { StandardPlace } from '@gong-gu/models';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PostgresConfigModule,
    QueueConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    TypeOrmModule.forFeature([StandardPlace]),
    BullModule.registerQueueAsync({
      name: STANDARD_PLACE_QUEUE_NAME,
      useClass: QueueConfigService,
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
