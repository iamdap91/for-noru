import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommonConfigModule,
  PostgresConfigModule,
  PostgresConfigService,
} from '@for-noru/config';
import { AppController } from './app.controller';
import { RequestLoggerMiddleware } from './middlewares';
import { PlacesModule } from './apis/places/places.module';
import { ProductsModule } from './apis/products/products.module';
import { SearchModule } from './apis/search/search.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      config: { host: 'localhost', port: 6379 },
    }),
    CommonConfigModule,
    PostgresConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    PlacesModule,
    ProductsModule,
    PlacesModule,
    SearchModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
