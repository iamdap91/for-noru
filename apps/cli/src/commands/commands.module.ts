import { Module } from '@nestjs/common';
import {
  RestaurantCreateCommand,
  RestaurantsCommands,
} from './restaurants-commands';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule, PostgresConfigService } from '@gong-gu/config';
import { BackendRestaurantsModule } from '@gong-gu/backend/restaurants';

@Module({
  imports: [
    PostgresConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    BackendRestaurantsModule,
  ],
  providers: [RestaurantsCommands, RestaurantCreateCommand],
})
export class CommandsModule {}
