import { CommandRunner, SubCommand } from 'nest-commander';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
} from '@gong-gu/engine';
import { throwIfIsNil } from '@gong-gu/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardPlace } from '@gong-gu/models';
import { Repository } from 'typeorm';

@SubCommand({
  name: 'scrape',
  arguments: '[code, id]',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class PlaceScrapeCommand extends CommandRunner {
  constructor(
    @InjectRepository(StandardPlace)
    private readonly standardPlaceRepo: Repository<StandardPlace>
  ) {
    super();
  }

  async run([code, id]: string[]) {
    const { name, coordinates } = await this.standardPlaceRepo
      .findOne({ where: { id: +id, active: true } })
      .then(throwIfIsNil(new Error('존재하지 않는 장소입니다.')));

    const engine = await EngineFactory.build(code);
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(engine);

    const browserFactory = await new BrowserFactory(browserOptions).init();
    const page = await browserFactory.getPage();
    const placeInfo = await engine.place({ name, coordinates }, page);

    await this.standardPlaceRepo.update(+id, placeInfo);
  }
}
