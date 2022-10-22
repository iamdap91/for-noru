import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { RestaurantCreateCommand } from './sub-commands';

@Command({
  name: 'restaurant',
  arguments: '[name]',
  description: '음식점 관련 cli',
  subCommands: [RestaurantCreateCommand],
})
export class RestaurantCommands extends CommandRunner {
  async run(): Promise<void> {
    Logger.log('-h --help 명령어를 참고해주세요.');
  }
}
