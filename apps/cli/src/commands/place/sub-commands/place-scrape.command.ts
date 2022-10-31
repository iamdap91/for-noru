import { CommandRunner, SubCommand } from 'nest-commander';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
} from '@for-noru/engine';
import { throwIfIsNil } from '@for-noru/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NaverPlace, StandardPlace } from '@for-noru/models';
import { Repository } from 'typeorm';

@SubCommand({
  name: 'scrape',
  arguments: '[code, id]',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class PlaceScrapeCommand extends CommandRunner {
  constructor(
    @InjectRepository(StandardPlace)
    private readonly standardPlaceRepo: Repository<StandardPlace>,
    @InjectRepository(NaverPlace)
    private readonly naverPlaceRepo: Repository<NaverPlace>
  ) {
    super();
  }

  async run([code, id]: string[]) {
    const { name, coordinates, active, naverPlace } =
      await this.standardPlaceRepo
        .findOne({ where: { id: +id }, relations: ['naverPlace'] })
        .then(throwIfIsNil(new Error('표준 데이터 정보가 없습니다.')));

    if (!active) {
      await this.naverPlaceRepo.softDelete(naverPlace.id);
      return;
    }

    const engine = await EngineFactory.build(code);
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(engine);

    const browserFactory = await new BrowserFactory(browserOptions).init();
    const page = await browserFactory.getPage();
    const placeInfo = await engine.place({ name, coordinates }, page);

    await this.naverPlaceRepo.save({
      standardPlaceId: +id,
      ...(naverPlace || {}),
      ...placeInfo,
    });
  }
}
