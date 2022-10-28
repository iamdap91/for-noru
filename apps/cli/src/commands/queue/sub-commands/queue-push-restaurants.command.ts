import { CommandRunner, SubCommand } from 'nest-commander';
import { Repository } from 'typeorm';
import { StandardPlace } from '@gong-gu/models';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { RESTAURANTS_QUEUE_NAME } from '@gong-gu/config';

@SubCommand({
  name: 'restaurants',
  description: '큐에 영업중인 레스토랑 리스트 추가',
})
export class QueuePushRestaurantsCommand extends CommandRunner {
  constructor(
    @InjectRepository(StandardPlace)
    private readonly repository: Repository<StandardPlace>,
    @InjectQueue(RESTAURANTS_QUEUE_NAME)
    private readonly queue: Queue
  ) {
    super();
  }

  async run() {
    const restaurants = await this.repository.find({
      where: { active: true },
      order: { id: 'desc' },
    });

    for (const { id } of restaurants) {
      await this.queue.add(id, {
        jobId: id,
        attempts: 2,
        removeOnFail: true,
        removeOnComplete: true,
      });
    }
  }
}
