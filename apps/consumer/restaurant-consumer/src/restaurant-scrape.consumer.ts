import { Process, Processor } from '@nestjs/bull';
import { Page } from 'puppeteer';
import { DoneCallback, Job } from 'bull';
import { QUEUE_NAME, RestaurantsService } from '@gong-gu/backend/restaurants';
import { Logger, OnModuleInit } from '@nestjs/common';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
  EngineInterface,
} from '@gong-gu/engine';

@Processor(QUEUE_NAME)
export class RestaurantScrapeConsumer implements OnModuleInit {
  private engine: EngineInterface;
  private page: Page;
  private logger: Logger;
  constructor(private readonly service: RestaurantsService) {
    this.logger = new Logger('consumer');
  }

  @Process({ concurrency: 2 })
  async run({ data: id }: Job, done: DoneCallback) {
    try {
      const { name, xCoordinate, yCoordinate } = await this.service.findOne({
        where: { id },
      });
      const restaurantInfo = await this.engine.restaurant(
        { name, coordinates: [+xCoordinate, +yCoordinate] },
        this.page
      );
      await this.service.update(+id, restaurantInfo);
      done(null);
    } catch (e) {
      done(e);
    }
  }

  async onModuleInit() {
    // 엔진 생성
    const engine = await EngineFactory.build('A001');
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(engine);

    // 브라우저 생성
    const browserFactory = await new BrowserFactory(browserOptions).init();
    this.page = await browserFactory.getPage();
  }
}
