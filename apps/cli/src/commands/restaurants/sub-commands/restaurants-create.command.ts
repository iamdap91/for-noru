import { CommandRunner, SubCommand } from 'nest-commander';
import * as fs from 'fs';
import * as readline from 'readline';
import { chunk } from 'lodash';
import { Logger } from '@nestjs/common';
import { RestaurantsService } from '@gong-gu/backend/restaurants';
import { serialize } from '../serialize';

@SubCommand({ name: 'create', description: '음식점 생성' })
export class RestaurantCreateCommand extends CommandRunner {
  constructor(private readonly restaurantsService: RestaurantsService) {
    super();
  }

  async run() {
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
