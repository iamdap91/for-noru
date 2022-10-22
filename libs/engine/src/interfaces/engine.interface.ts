import { Browser } from 'puppeteer';

export class EngineInterface {
  restaurant: (id: number, browser: Browser) => Promise<never>;
}
