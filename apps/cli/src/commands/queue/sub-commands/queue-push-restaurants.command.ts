import { CommandRunner, SubCommand } from 'nest-commander';
import { RestaurantsService } from '@gong-gu/backend/restaurants';

@SubCommand({
  name: 'restaurants',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class QueuePushRestaurantsCommand extends CommandRunner {
  constructor(private readonly restaurantsService: RestaurantsService) {
    super();
  }

  async run() {
    const restaurants = await this.restaurantsService.find({
      where: { active: true },
    });

    for (const { id } of restaurants) {
      await this.restaurantsService.addQueue(id);
    }
  }
}
