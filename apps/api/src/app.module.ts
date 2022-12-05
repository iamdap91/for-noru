import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommonConfigModule,
  PostgresConfigModule,
  PostgresConfigService,
  RedisConfigModule,
} from '@for-noru/config';
import { AppController } from './app.controller';
import { RequestLoggerMiddleware } from './middlewares';
import { PlacesModule } from './apis/places/places.module';
import { ProductsModule } from './apis/products/products.module';
import { SearchModule } from './apis/search/search.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { VotesModule } from './apis/votes/votes.module';
import { RedisConfigService } from '@for-noru/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    RedisModule.forRootAsync({
      imports: [RedisConfigModule],
      useExisting: RedisConfigService,
    }),
    CommonConfigModule,
    PostgresConfigModule,
    PlacesModule,
    ProductsModule,
    PlacesModule,
    SearchModule,
    VotesModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
