import { Command, CommandRunner } from 'nest-commander';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { RestaurantsService } from '@gong-gu/backend/restaurants';
import { serialize } from './serialize';
import * as readline from 'readline';

export enum SubCommand {
  CREATE = 'create',
  UPDATE = 'update',
}

@Command({
  name: 'restaurant',
  description: '음식점 관련 cli',
})
export class RestaurantsCommands extends CommandRunner {
  constructor(private readonly restaurantsService: RestaurantsService) {
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
    const records = await this.readFile();
    for (const record of records) {
      const items = record
        .split(',')
        .map((item) => item.slice(1, item.length - 1));
      const restaurant = serialize(items);
      await this.restaurantsService.create(restaurant);
    }
  }

  async readFile() {
    const records = [];
    await new Promise<void>((resolve) => {
      const fileStream = fs.createReadStream('tmp/csv/general.csv');
      const readLine = readline.createInterface({ input: fileStream });

      readLine.on('line', async (record) => {
        const items = record.split(',');
        // 주소에 콤마 들어가 있는 경우 합쳐준다. 좀 짜치긴하는데... 음... """" 과 ","의 콜라보라서 일단 이렇게 가자
        if (items.length === 49) {
          items[18] = items[18] + items[19];
          items.splice(19, 1);
        }
        records.push(items.join(','));
      });
      fileStream
        .on('error', (err) => Logger.error(err))
        .on('end', () => {
          fileStream.close();
          resolve();
        });
    });
    return records;
  }
}
