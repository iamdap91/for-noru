import { Browser } from 'puppeteer';
import { BaseEngine, BrowserFactory } from '@gong-gu/engine';
import { WithBrowser } from '../decorators/with-browser';
import { A001Service } from './A001.service';

export default class Engine implements BaseEngine {
  constructor(private readonly service: A001Service) {}

  @WithBrowser({ headless: true })
  async product(id: number, browser: Browser) {
    const page = await BrowserFactory.getPage(browser);
    return this.service.restaurant(id, page);
  }
}
