import { Command, CommandRunner } from 'nest-commander';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Logger } from '@nestjs/common';
import { serialize } from './serialize';

export enum SubCommand {
  CREATE = 'create',
  UPDATE = 'update',
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
        return await this.create();
      case SubCommand.UPDATE:
      default:
        return;
    }
  }

  async create() {
    const records = await this.readCsv();

    for (const record of records) {
      serialize(record);
    }
  }

  async readCsv() {
    const records = [];

    const parserOptions = {
      columns: true,
      delimiter: ',',
      trim: true,
      skip_empty_lines: true,
      skipRecordsWithError: true,
    };

    await new Promise<void>((resolve) => {
      fs.createReadStream('tmp/output.csv', {
        encoding: 'utf8',
      })
        .pipe(parse(parserOptions))
        .on('error', (e) => Logger.error(e))
        .on('data', (data) => records.push(data))
        .on('end', () => resolve());
    });

    return records;
  }
}
