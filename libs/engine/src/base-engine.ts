import { Browser } from 'puppeteer';
import { EngineInterface, FormattedPlace } from "./interfaces";
import { EngineParam } from './interfaces/engine-param.interface';

export class BaseEngine implements EngineInterface {
  restaurant(param: EngineParam, browser: Browser): Promise<FormattedPlace>;
  restaurant(): Promise<FormattedPlace> {
    throw new Error('restaurant 기능 개발중');
  }
}
