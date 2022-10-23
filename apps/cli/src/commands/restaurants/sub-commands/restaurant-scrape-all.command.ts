import { CommandRunner, SubCommand } from 'nest-commander';
import { RestaurantsService } from '@gong-gu/backend/restaurants';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
} from '@gong-gu/engine';

@SubCommand({
  name: 'scrape-all',
  arguments: '[code]',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class RestaurantScrapeAllCommand extends CommandRunner {
  constructor(private readonly restaurantsService: RestaurantsService) {
    super();
  }

  async run([code]: string[]) {
    const list = await this.restaurantsService.find({
      where: { active: true },
    });

    const engine = await EngineFactory.build(code);
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(engine);
    for (const { id, name, xCoordinate, yCoordinate } of list) {
      const browser = await BrowserFactory.createBrowser(browserOptions);
      const restaurantInfo = await engine.restaurant(
        {
          name,
          coordinates: [+xCoordinate, +yCoordinate],
        },
        browser
      );

      await this.restaurantsService.update(+id, restaurantInfo);
    }
  }
}
