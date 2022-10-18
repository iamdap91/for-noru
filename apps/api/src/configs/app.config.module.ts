import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import commonConfig from './sources/common.config';
import databaseConfig from './sources/postgres.config';
import { CommonConfigService, PostgresConfigService } from './services';

/** 환경변수 모듈 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig, databaseConfig],
      isGlobal: true,
    }),
  ],
  providers: [CommonConfigService, PostgresConfigService],
  exports: [CommonConfigService, PostgresConfigService],
})
export class AppConfigModule {}
