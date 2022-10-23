import { CommandRunner, SubCommand } from 'nest-commander';
import { RestaurantsService } from '@gong-gu/backend/restaurants';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
} from '@gong-gu/engine';
import ora from 'ora';

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
    const spinner = ora('scrape-all start').start();
    const list = await this.restaurantsService.find({
      where: { active: true },
    });
    spinner.warn(`List length : ${list.length}`);

    const engine = await EngineFactory.build(code);
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(engine);

    const browserFactory = await new BrowserFactory(browserOptions).init();
    const page = await browserFactory.getPage();
    for (const { id, name, xCoordinate, yCoordinate } of list) {
      try {
        const restaurantInfo = await engine.restaurant(
          { name, coordinates: [+xCoordinate, +yCoordinate] },
          page
        );
        await this.restaurantsService.update(+id, restaurantInfo);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
