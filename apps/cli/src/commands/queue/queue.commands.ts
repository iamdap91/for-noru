import { Command, CommandRunner } from 'nest-commander';
import { QueuePushRestaurantsCommand } from './sub-commands';

@Command({
  name: 'queue-push',
  arguments: '[name]',
  description: '큐 적재 cli',
  subCommands: [QueuePushRestaurantsCommand],
})
export class QueueCommand extends CommandRunner {
  async run(): Promise<void> {
    console.error('-h --help 명령어를 참고해주세요.');
  }
}
