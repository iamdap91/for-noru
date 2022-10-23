import { Browser } from 'puppeteer';
import { EngineParam } from './engine-param.interface';
import { FormattedPlace } from './formatted-place.interface';

export class EngineInterface {
  restaurant: (param: EngineParam, browser: Browser) => Promise<FormattedPlace>;
}
