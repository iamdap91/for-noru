import { Command, CommandRunner } from 'nest-commander';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { RestaurantsService } from '@gong-gu/backend/restaurants';
import { serialize } from './serialize';
import * as readline from 'readline';
import { chunk } from 'lodash';

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
    const records: string[] = await this.readFile();
    records.shift();

    const chunks = chunk(records, 1000);
    for (const chunk of chunks) {
      const restaurants = chunk
        .map((record) => record.split('\t'))
        .map((recordItems) => serialize(recordItems));

      await this.restaurantsService.bulkInsert(restaurants);
    }
  }

  async readFile() {
    const records = [];
    await new Promise<void>((resolve) => {
      const fileStream = fs.createReadStream('tmp/csv/general.txt', {
        encoding: 'utf16le',
      });
      const readLine = readline.createInterface({ input: fileStream });

      readLine.on('line', (record) => records.push(record));
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
