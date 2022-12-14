import { CommandRunner, SubCommand } from 'nest-commander';
import { Repository } from 'typeorm';
import { Place } from '@for-noru/models';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PLACE_SCRAPER_QUEUE } from '@for-noru/config';

@SubCommand({
  name: 'place',
  description: '큐에 영업중인 장소 리스트 추가',
})
export class QueuePushPlaceCommand extends CommandRunner {
  constructor(
    @InjectRepository(Place)
    private readonly repository: Repository<Place>,
    @InjectQueue(PLACE_SCRAPER_QUEUE)
    private readonly queue: Queue
  ) {
    super();
  }

  async run() {
    const places = await this.repository.find({
      where: { active: true },
      order: { id: 'desc' },
    });

    for (const { id } of places) {
      await this.queue.add(id, {
        jobId: id,
        attempts: 2,
        removeOnFail: true,
        removeOnComplete: true,
      });
    }
  }
}
