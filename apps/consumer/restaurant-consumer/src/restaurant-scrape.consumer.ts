import { Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
import { RestaurantsService } from '@gong-gu/backend/restaurants';

@Processor('restaurants')
export class RestaurantScrapeConsumer {
  constructor(private readonly service: RestaurantsService) {}

  @Process({ concurrency: 3 })
  async run({ data }: Job, done: DoneCallback) {
    console.log(data);
    done();
  }
}
