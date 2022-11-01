import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgresConfigModule,
  PostgresConfigService,
  PLACE_SCRAPER_QUEUE,
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
      name: PLACE_SCRAPER_QUEUE,
      redis: {
        host: environment.REDIS_HOST || 'redis',
        port: +environment.REDIS_PORT || 6379,
      },
    }),
  ],
  providers: [ScrapePlaceConsumer],
})
export class ScrapePlaceModule {}
