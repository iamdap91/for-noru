import { Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';

@Processor('restaurants')
export class RestaurantScrapeConsumer {
  @Process({ concurrency: 1 })
  async run(job: Job, done: DoneCallback) {
    console.log(job);
    done();
  }
}
