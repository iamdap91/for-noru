import { Process, Processor } from '@nestjs/bull';
import { Page } from 'puppeteer';
import { DoneCallback, Job } from 'bull';
import { OnModuleInit } from '@nestjs/common';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
  EngineInterface,
} from '@gong-gu/engine';
import { waitForCondition } from '@gong-gu/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@gong-gu/models';
import { RESTAURANTS_QUEUE_NAME } from '@gong-gu/config';
import { Repository } from 'typeorm';

@Processor(RESTAURANTS_QUEUE_NAME)
export class RestaurantScrapeConsumer implements OnModuleInit {
  private engine: EngineInterface;
  private page: Page;
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>
  ) {}

  @Process({ concurrency: 1 })
  async run({ data: id }: Job, done: DoneCallback) {
    await waitForCondition(() => !!this.page, 500);

    try {
      const { name, xCoordinate, yCoordinate } = await this.repository.findOne({
        where: { id },
      });
      const restaurantInfo = await this.engine.restaurant(
        { name, coordinates: [+xCoordinate, +yCoordinate] },
        this.page
      );
      await this.repository.update(+id, restaurantInfo);
      done(null);
    } catch (e) {
      console.error(e);
      done(e);
    }
  }

  async onModuleInit() {
    // 엔진 생성
    this.engine = await EngineFactory.build('A001');
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(
      this.engine
    );

    // 브라우저 생성
    const browserFactory = await new BrowserFactory(browserOptions).init();
    this.page = await browserFactory.getPage();
  }
}
