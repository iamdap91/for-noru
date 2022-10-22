import { Browser } from 'puppeteer';
import { EngineInterface } from './interfaces';

export class BaseEngine implements EngineInterface {
  restaurant(name: string, address: string, browser: Browser): Promise<void>;
  restaurant(): Promise<void> {
    throw new Error('product 기능 개발중');
  }
}
