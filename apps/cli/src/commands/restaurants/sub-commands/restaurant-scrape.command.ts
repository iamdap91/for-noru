import { CommandRunner, SubCommand } from 'nest-commander';
import { RestaurantsService } from '@gong-gu/backend/restaurants';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
} from '@gong-gu/engine';
import { throwIfIsNil } from '@gong-gu/common';

@SubCommand({
  name: 'scrape',
  arguments: '[code, id]',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class RestaurantScrapeCommand extends CommandRunner {
  constructor(private readonly restaurantsService: RestaurantsService) {
    super();
  }

  async run([code, id]: string[]) {
    const { name, xCoordinate, yCoordinate } = await this.restaurantsService
      .findOne({ where: { id: +id, active: true } })
      .then(throwIfIsNil(new Error('존재하지 않는 레스토랑입니다.')));

    const engine = await EngineFactory.build(code);
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(engine);

    const browser = await BrowserFactory.createBrowser(browserOptions);
    await engine.restaurant(
      {
        name,
        coordinates: [+xCoordinate, +yCoordinate],
      },
      browser
    );
  }
}
