import { Browser } from 'puppeteer';

export class EngineInterface {
  restaurant: (
    name: string,
    address: string,
    browser: Browser
  ) => Promise<void>;
}
