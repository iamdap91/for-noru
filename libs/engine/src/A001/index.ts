import { Page } from 'puppeteer';
import { BaseEngine } from '@gong-gu/engine';
import { WithBrowser } from '../decorators/with-browser';
import { A001Service } from './A001.service';
import { EngineParam } from '../interfaces/engine-param.interface';

export default class Engine implements BaseEngine {
  service: A001Service;

  constructor() {
    this.service = new A001Service();
  }

  @WithBrowser({ headless: true, channel: 'chrome', fastMode: true })
  async restaurant(param: EngineParam, page: Page) {
    return await this.service.restaurant(param, page);
  }
}
