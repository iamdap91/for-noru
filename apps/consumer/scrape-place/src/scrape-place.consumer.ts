import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Page, ProtocolError } from 'puppeteer';
import { DoneCallback, Job } from 'bull';
import { Logger, OnModuleInit } from '@nestjs/common';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
  EngineInterface,
} from '@for-noru/engine';
import { throwIfIsNil, waitForCondition } from '@for-noru/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NaverPlace, StandardPlace } from '@for-noru/models';
import { STANDARD_PLACE_QUEUE_NAME } from '@for-noru/config';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Processor(STANDARD_PLACE_QUEUE_NAME)
export class ScrapePlaceConsumer implements OnModuleInit {
  private engine: EngineInterface;
  private page: Page;

  constructor(
    @InjectRepository(StandardPlace)
    private readonly standardPlaceRepo: Repository<StandardPlace>,
    @InjectRepository(NaverPlace)
    private readonly naverPlaceRepo: Repository<NaverPlace>
  ) {}

  @Process({ concurrency: 1 })
  async run({ data: id }: Job, done: DoneCallback) {
    await waitForCondition(() => !!this.page, 500);

    try {
      const { name, coordinates, active, naverPlace } =
        await this.standardPlaceRepo
          .findOne({ where: { id }, relations: ['naverPlace'] })
          .then(
            throwIfIsNil(new NotFoundError('표준 데이터 정보가 없습니다.'))
          );

      if (!active) {
        await this.naverPlaceRepo.softDelete(naverPlace.id);
        return;
      }

      const placeInfo = await this.engine.place(
        { name, coordinates },
        this.page
      );

      await this.naverPlaceRepo.save({
        standardPlaceId: +id,
        ...(naverPlace || {}),
        ...placeInfo,
      });
      done(null);
    } catch (e) {
      if (e instanceof ProtocolError) {
        await this.onModuleInit();
      }
      done(e);
    }
  }

  async onModuleInit() {
    // 엔진 생성
    this.engine = await EngineFactory.build('A001');
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(
      this.engine
    );

    // 브라우저 생성
    const browserFactory = await new BrowserFactory(browserOptions).init();
    this.page = await browserFactory.getPage();
  }

  @OnQueueActive()
  async onQueueActive(job: Job) {
    Logger.log(`jobId: ${job.id} start`);
  }

  @OnQueueCompleted()
  async onQueueComplete(job: Job) {
    Logger.log(`${job?.data} done`);
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job) {
    Logger.error(`jobId: ${job?.data}  Failed : ${job?.failedReason}`);
  }

  @OnQueueError()
  async OnQueueError(e) {
    Logger.error(e);
  }
}
