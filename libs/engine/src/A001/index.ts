import { Browser } from 'puppeteer';
import { BaseEngine, BrowserFactory } from '@gong-gu/engine';
import { WithBrowser } from '../decorators/with-browser';
import { A001Service } from './A001.service';
import { EngineParam } from '../interfaces/engine-param.interface';

export default class Engine implements BaseEngine {
  service: A001Service;

  constructor() {
    this.service = new A001Service();
  }

  @WithBrowser({ headless: false, channel: 'chrome' })
  async restaurant(param: EngineParam, browser: Browser) {
    const page = await BrowserFactory.getPage(browser);
    return this.service.restaurant(param, page);
  }
}
