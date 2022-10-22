import { CommandRunner, SubCommand } from 'nest-commander';
import { RestaurantsService } from '@gong-gu/backend/restaurants';
import { Logger } from '@nestjs/common';

@SubCommand({
  name: 'scrape',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class RestaurantsScrapeCommand extends CommandRunner {
  constructor(private readonly restaurantsService: RestaurantsService) {
    super();
  }

  async run() {
    Logger.log('scrape');
  }
}
