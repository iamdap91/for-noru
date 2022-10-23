import { CommandRunner, SubCommand } from 'nest-commander';
import { RestaurantsService } from '@gong-gu/backend/restaurants';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
} from '@gong-gu/engine';
import ora from 'ora';
import { Browser } from 'puppeteer';

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
    const spinner = ora('process scrape-all start').start();
    const list = await this.restaurantsService.find({
      where: { active: true },
    });
    spinner.warn(`List length : ${list.length}`);

    const engine = await EngineFactory.build(code);
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(engine);

    // todo 이거 2단 트라이-캐치 고쳐야한다.
    let browser: Browser;
    try {
      browser = await BrowserFactory.createBrowser(browserOptions);

      for (const { id, name, xCoordinate, yCoordinate } of list) {
        try {
          const restaurantInfo = await engine.restaurant(
            {
              name,
              coordinates: [+xCoordinate, +yCoordinate],
            },
            browser
          );

          await this.restaurantsService.update(+id, restaurantInfo);
        } catch (e) {
          console.error(e);
          spinner.fail(e);
        }
      }
    } catch (e) {
      spinner.fail(e);
    } finally {
      await browser.close();
    }
  }
}
