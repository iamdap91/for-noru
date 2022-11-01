import { CommandRunner, SubCommand } from 'nest-commander';
import {
  BrowserFactory,
  BrowserOptionInterface,
  EngineFactory,
  NavigationError,
  PageBlockedError,
} from '@for-noru/engine';
import ora from 'ora';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardPlace } from '@for-noru/models';
import { Repository } from 'typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@SubCommand({
  name: 'scrape-all',
  arguments: '[code]',
  description: '네이버 크롤링해서 반려동물 동반인지 체크',
})
export class PlaceScrapeAllCommand extends CommandRunner {
  constructor(
    @InjectRepository(StandardPlace)
    private readonly standardPlaceRepo: Repository<StandardPlace>,
    private readonly elasticsearchService: ElasticsearchService
  ) {
    super();
  }

  async run([code]: string[]) {
    const spinner = ora('scrape-all start').start();
    const list = await this.standardPlaceRepo.find({
      where: { active: true },
    });
    spinner.warn(`List length : ${list.length}`);

    // 엔진 생성
    const engine = await EngineFactory.build(code);
    const browserOptions: BrowserOptionInterface = EngineFactory.scan(engine);

    // 브라우저 생성
    const browserFactory = await new BrowserFactory(browserOptions).init();
    const page = await browserFactory.getPage();

    // 엔진 실행
    for (const { id, name, coordinates } of list) {
      try {
        const { lat, lon, ...placeInfo } = await engine.place(
          { name, coordinates },
          page
        );
        await this.elasticsearchService.create({
          id: id.toString(),
          index: 'place',
          document: { ...placeInfo, pin: { location: { lat, lon } } },
        });
      } catch (e) {
        switch (true) {
          case e instanceof NavigationError:
          case e instanceof PageBlockedError:
            await browserFactory.restartBrowser();
        }
      }
    }

    await browserFactory.terminateBrowser();
    spinner.succeed('scrape-all end');
  }
}
