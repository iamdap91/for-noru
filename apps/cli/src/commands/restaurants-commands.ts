import { Command, CommandRunner } from 'nest-commander';
import * as fs from 'fs';
import * as readline from 'readline';

export enum SubCommand {
  CREATE = 'create',
  UPDATE = 'update',
}

// const keyResolver = (column: string) => {};

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
        return await this.create();
      case SubCommand.UPDATE:
      default:
        return;
    }
  }

  async create() {
    const lines = await this.readFile();
    const [one, two] = lines;

    console.log(one);
    console.log(two);
    // const columns = zero.split(',');

    // for (const line of [one, two]) {
    //   const fields = line.split(',');
    //   const obj = {} as Record<string, string>;
    //   for (const [key, val] of Object.entries(columns)) {
    //     obj[val as string] = fields[key];
    //   }
    //   console.log(obj);
    // }
  }

  async readFile() {
    const lines = [];
    await new Promise<void>((resolve) => {
      const fileStream = fs.createReadStream('tmp/output.csv', {
        encoding: 'utf8',
      });
      const readLine = readline.createInterface({ input: fileStream });

      readLine.on('line', async (row) => lines.push(row));
      fileStream.on('end', () => resolve());
      fileStream.on('error', (err) => console.error(err));
    });

    return lines;
  }
}
