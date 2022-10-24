import { CommandRunner, SubCommand } from 'nest-commander';
import { RestaurantsService } from '@gong-gu/backend/restaurants';

@SubCommand({
  name: 'restaurants',
  description: '큐에 영업중인 레스토랑 리스트 추가',
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
