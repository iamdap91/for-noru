import { CommandRunner, SubCommand } from 'nest-commander';
import { Repository } from 'typeorm';
import { StandardPlace } from '@for-noru/models';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { STANDARD_PLACE_QUEUE_NAME } from '@for-noru/config';

@SubCommand({
  name: 'place',
  description: '큐에 영업중인 장소 리스트 추가',
})
export class QueuePushPlaceCommand extends CommandRunner {
  constructor(
    @InjectRepository(StandardPlace)
    private readonly repository: Repository<StandardPlace>,
    @InjectQueue(STANDARD_PLACE_QUEUE_NAME)
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
