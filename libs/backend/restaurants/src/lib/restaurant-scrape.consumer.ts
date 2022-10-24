import { Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';

@Processor('restaurants')
export class RestaurantScrapeConsumer {
  @Process({ concurrency: 3 })
  async run({ data }: Job, done: DoneCallback) {
    console.log(data);
    done();
  }
}
