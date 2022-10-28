import { CommandRunner, SubCommand } from 'nest-commander';
import * as fs from 'fs';
import * as readline from 'readline';
import { chunk } from 'lodash';
import { Logger } from '@nestjs/common';
import { serialize } from '../serialize';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardPlace } from '@gong-gu/models';
import { Repository } from 'typeorm';

@SubCommand({ name: 'create', description: '음식점 생성' })
export class RestaurantCreateCommand extends CommandRunner {
  constructor(
    @InjectRepository(StandardPlace)
    private readonly repository: Repository<StandardPlace>
  ) {
    super();
  }

  async run() {
    const records: string[] = await this.readFile();
    records.shift();

    let i = 1;
    const chunks = chunk(records, 1000);
    for (const chunk of chunks) {
      console.log(`${i++} 번째`);
      const restaurants = chunk
        .map((record) => record.split('\t'))
        .map((recordItems) => serialize(recordItems));

      await this.repository.insert(restaurants);
    }
  }

  async readFile() {
    const records = [];
    await new Promise<void>((resolve) => {
      const fileStream = fs.createReadStream('tmp/csv/rest.txt', {
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
