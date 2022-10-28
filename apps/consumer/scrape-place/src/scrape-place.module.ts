import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgresConfigModule,
  PostgresConfigService,
  RESTAURANTS_QUEUE_NAME,
} from '@gong-gu/config';
import { ScrapePlaceConsumer } from './scrape-place.consumer';
import { BullModule } from '@nestjs/bull';
import { StandardPlace } from '@gong-gu/models';
import { environment } from './environments/environment';

@Module({
  imports: [
    PostgresConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    TypeOrmModule.forFeature([StandardPlace]),
    BullModule.registerQueue({
      name: RESTAURANTS_QUEUE_NAME,
      redis: {
        host: environment.REDIS_HOST || 'redis',
        port: +environment.REDIS_PORT || 6379,
      },
    }),
  ],
  providers: [ScrapePlaceConsumer],
})
export class ScrapePlaceModule {}
