import { Command, CommandRunner } from 'nest-commander';
import { QueuePushPlaceCommand } from './sub-commands';

@Command({
  name: 'queue-push',
  arguments: '[name]',
  description: '큐 적재 cli',
  subCommands: [QueuePushPlaceCommand],
})
export class QueueCommand extends CommandRunner {
  async run(): Promise<void> {
    console.error('-h --help 명령어를 참고해주세요.');
  }
}
