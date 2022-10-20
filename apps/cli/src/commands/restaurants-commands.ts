import { Command, CommandRunner } from 'nest-commander';

export enum SubCommand {
  'CREATE' = 'create',
  'UPDATE' = 'update',
}

@Command({
  name: 'restaurant',
  description: '음식점 관련 cli',
})
export class RestaurantsCommands extends CommandRunner {
  constructor() {
    super();
  }

  async run([subCommand]: SubCommand[]): Promise<void> {
    switch (subCommand) {
      case SubCommand.CREATE:
        console.log('create');
        return;
      case SubCommand.UPDATE:
        console.log('update');
        return;
      default:
        console.log('default');
        return;
    }
  }
}
