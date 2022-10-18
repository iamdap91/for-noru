import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { PostgresConfigService } from './configs/services';
import { AppConfigModule } from './configs/app.config.module';
import { ProductsModule } from './apis/products/products.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
