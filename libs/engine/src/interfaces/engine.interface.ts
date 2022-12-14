import { Page } from 'puppeteer';
import { EngineParam } from './engine-param.interface';
import { FormattedPlace } from './formatted-place.interface';

export class EngineInterface {
  place: (param: EngineParam, page: Page) => Promise<FormattedPlace>;
}
