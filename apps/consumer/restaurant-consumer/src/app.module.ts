import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgresConfigModule,
  PostgresConfigService,
  QueueConfigModule,
} from '@gong-gu/config';
import { BackendRestaurantsModule } from '@gong-gu/backend/restaurants';

@Module({
  imports: [
    PostgresConfigModule,
    BackendRestaurantsModule,
    QueueConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
