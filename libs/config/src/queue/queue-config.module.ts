import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import queueConfig from './queue.config';
import { QueueConfigService } from './queue-config.service';

/** 환경변수 모듈 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [queueConfig],
      isGlobal: true,
    }),
  ],
  providers: [QueueConfigService],
  exports: [QueueConfigService],
})
export class QueueConfigModule {}
