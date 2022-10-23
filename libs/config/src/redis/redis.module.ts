import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisConfig from './redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfig],
      isGlobal: true,
    }),
    // BullModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //
    //   }),
    //
    //   // useFactory: async (configService: ConfigService) => ({
    //   //   name: option.name,
    //   //   redis: configService.get('redis'),
    //   //   limiter: option?.limiter,
    //   //   defaultJobOptions: option?.defaultJobOptions,
    //   // }),
    // }),
  ],
  exports: [],
})
export class ConfigRedisModule {}
