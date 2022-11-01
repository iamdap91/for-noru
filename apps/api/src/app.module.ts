import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommonConfigModule,
  PostgresConfigModule,
  PostgresConfigService,
} from '@for-noru/config';
import { AppController } from './app.controller';
import { RequestLoggerMiddleware } from './middlewares';

@Module({
  imports: [
    CommonConfigModule,
    PostgresConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    // ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
