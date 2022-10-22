import { Browser } from 'puppeteer';
import { EngineParam } from './engine-param.interface';

export class EngineInterface {
  restaurant: (param: EngineParam, browser: Browser) => Promise<void>;
}
