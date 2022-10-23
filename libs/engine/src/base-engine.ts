import { Browser } from 'puppeteer';
import { EngineInterface } from './interfaces';
import { EngineParam } from './interfaces/engine-param.interface';

export class BaseEngine implements EngineInterface {
  restaurant(param: EngineParam, browser: Browser): Promise<boolean>;
  restaurant(): Promise<boolean> {
    throw new Error('restaurant 기능 개발중');
  }
}
