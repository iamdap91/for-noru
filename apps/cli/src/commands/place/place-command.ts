import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import {
  PlaceCreateCommand,
  PlaceScrapeAllCommand,
  PlaceScrapeCommand,
  PlaceUpdateCommand,
} from './sub-commands';

@Command({
  name: 'place',
  arguments: '[name]',
  description: '표준 데이터 정보 cli',
  subCommands: [
    PlaceCreateCommand,
    PlaceUpdateCommand,
    PlaceScrapeCommand,
    PlaceScrapeAllCommand,
  ],
})
export class PlaceCommand extends CommandRunner {
  async run(): Promise<void> {
    Logger.log('-h --help 명령어를 참고해주세요.');
  }
}
