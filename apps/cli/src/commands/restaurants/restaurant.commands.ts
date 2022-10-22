import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import {
  RestaurantCreateCommand,
  RestaurantsUpdateCommand,
} from './sub-commands';
import { RestaurantScrapeCommand } from './sub-commands/restaurant-scrape.command';

@Command({
  name: 'restaurant',
  arguments: '[name]',
  description: '음식점 관련 cli',
  subCommands: [
    RestaurantCreateCommand,
    RestaurantsUpdateCommand,
    RestaurantScrapeCommand,
  ],
})
export class RestaurantCommands extends CommandRunner {
  async run(): Promise<void> {
    Logger.log('-h --help 명령어를 참고해주세요.');
  }
}
