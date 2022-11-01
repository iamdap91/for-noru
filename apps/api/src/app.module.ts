import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { ProductsModule } from './apis/products/products.module';
import {
  CommonConfigModule,
  PostgresConfigModule,
  PostgresConfigService,
} from '@for-noru/config';
import { RequestLoggerMiddleware } from './middlewares';

@Module({
  imports: [
    CommonConfigModule,
    PostgresConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
