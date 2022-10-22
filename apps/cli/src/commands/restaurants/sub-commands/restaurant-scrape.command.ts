import { CommandRunner, SubCommand } from 'nest-commander';
import { RestaurantsService } from '@gong-gu/backend/restaurants';

@SubCommand({
  name: 'scrape',
  arguments: 'id',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class RestaurantScrapeCommand extends CommandRunner {
  constructor(private readonly restaurantsService: RestaurantsService) {
    super();
  }

  async run() {
    console.log('scrape');
  }
}
