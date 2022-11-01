import { CommandRunner, SubCommand } from 'nest-commander';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
} from '@for-noru/engine';
import { throwIfIsNil } from '@for-noru/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from '@for-noru/models';
import { Repository } from 'typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Indices } from '@for-noru/config';

@SubCommand({
  name: 'scrape',
  arguments: '[code, id]',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class PlaceScrapeCommand extends CommandRunner {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,
    private readonly esService: ElasticsearchService
  ) {
    super();
  }

  async run([code, id]: string[]) {
    const { name, coordinates, active } = await this.placeRepo
      .findOne({ where: { id: +id } })
      .then(throwIfIsNil(new Error('표준 데이터 정보가 없습니다.')));

    if (!active) {
      await this.esService.delete({ id, index: Indices.PLACES });
      return;
    }

    const engine = await EngineFactory.build(code);
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(engine);

    const browserFactory = await new BrowserFactory(browserOptions).init();
    const page = await browserFactory.getPage();
    const { lat, lon, ...placeInfo } = await engine.place(
      { name, coordinates },
      page
    );

    await this.esService.create({
      id,
      index: Indices.PLACES,
      document: { ...placeInfo, pin: { location: { lat, lon } } },
    });
  }
}
