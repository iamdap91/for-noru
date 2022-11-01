import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgresConfigModule,
  PostgresConfigService,
  STANDARD_PLACE_QUEUE_NAME,
} from '@for-noru/config';
import { ScrapePlaceConsumer } from './scrape-place.consumer';
import { BullModule } from '@nestjs/bull';
import { Place } from '@for-noru/models';
import { environment } from './environments/environment';

@Module({
  imports: [
    PostgresConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    TypeOrmModule.forFeature([Place]),
    BullModule.registerQueue({
      name: STANDARD_PLACE_QUEUE_NAME,
      redis: {
        host: environment.REDIS_HOST || 'redis',
        port: +environment.REDIS_PORT || 6379,
      },
    }),
  ],
  providers: [ScrapePlaceConsumer],
})
export class ScrapePlaceModule {}
