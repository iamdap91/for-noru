import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule, PostgresConfigService } from '@gong-gu/config';
import { BackendRestaurantsModule } from '@gong-gu/backend/restaurants';
import { RestaurantCommands, RestaurantCreateCommand } from './restaurants';
import { RestaurantScrapeCommand } from './restaurants/sub-commands/restaurant-scrape.command';

@Module({
  imports: [
    PostgresConfigModule,
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    BackendRestaurantsModule,
  ],
  providers: [
    RestaurantCommands,
    RestaurantCreateCommand,
    RestaurantScrapeCommand,
  ],
})
export class CommandsModule {}
