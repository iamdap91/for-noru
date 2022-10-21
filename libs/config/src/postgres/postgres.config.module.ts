import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './postgres.config';
import { PostgresConfigService } from './postgres-config.service';

/** 환경변수 모듈 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
  providers: [PostgresConfigService],
  exports: [PostgresConfigService],
})
export class PostgresConfigModule {}
