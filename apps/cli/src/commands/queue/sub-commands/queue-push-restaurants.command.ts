import { CommandRunner, SubCommand } from 'nest-commander';
import { Repository } from 'typeorm';
import { Restaurant } from '@gong-gu/models';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@SubCommand({
  name: 'restaurants',
  description: '큐에 영업중인 레스토랑 리스트 추가',
})
export class QueuePushRestaurantsCommand extends CommandRunner {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>,
    @InjectQueue('restaurants')
    private readonly queue: Queue
  ) {
    super();
  }

  async run() {
    const restaurants = await this.repository.find({
      where: { active: true },
    });

    for (const { id } of restaurants) {
      await this.queue.add(id, { jobId: id });
    }
  }
}
