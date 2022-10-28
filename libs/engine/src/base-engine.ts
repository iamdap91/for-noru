import { Page } from 'puppeteer';
import { EngineInterface, FormattedPlace } from './interfaces';
import { EngineParam } from './interfaces/engine-param.interface';

export class BaseEngine implements EngineInterface {
  place(param: EngineParam, page: Page): Promise<FormattedPlace>;
  place(): Promise<FormattedPlace> {
    throw new Error('standard-place 기능 개발중');
  }
}
