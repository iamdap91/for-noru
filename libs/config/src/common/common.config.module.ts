import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import commonConfig from './common.config';
import { CommonConfigService } from './common-config.service';

/** 환경변수 모듈 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig],
      isGlobal: true,
    }),
  ],
  providers: [CommonConfigService],
  exports: [CommonConfigService],
})
export class CommonConfigModule {}
