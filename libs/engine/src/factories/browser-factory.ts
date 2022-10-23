import { Browser, Page, ResourceType } from 'puppeteer';
import UserAgent from 'user-agents';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { BrowserOptionInterface } from '../interfaces';

// const DEFAULT_OPTIONS = { args: ['--no-sandbox'] };
const TYPES_TO_BLOCK: ResourceType[] = [
  'image',
  'media',
  'other',
  'font',
  'stylesheet',
];

export class BrowserFactory {
  browser: Browser;
  options: BrowserOptionInterface;

  constructor(options: BrowserOptionInterface) {
    this.options = options;
  }

  async init(): Promise<BrowserFactory> {
    this.browser = await this.createBrowser(this.options);
    return this;
  }

  async createBrowser(options: BrowserOptionInterface): Promise<Browser> {
    const { fastMode, ...launchOptions } = options;

    const browser = await puppeteer.use(StealthPlugin()).launch(launchOptions);

    if (fastMode) {
      const [page] = await browser.pages();
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const resourceType = req.resourceType();
        TYPES_TO_BLOCK.includes(resourceType) ? req.abort() : req.continue();
      });
    }

    return browser;
  }

  async getPage(): Promise<Page> {
    const [page] = await this.browser.pages();
    await page.setUserAgent(
      new UserAgent({ platform: 'Win32' }).random().toString()
    );

    return page;
  }

  async restartBrowser(): Promise<void> {
    await this.browser.close();
    this.browser = await this.createBrowser(this.options);
  }

  async terminateBrowser(): Promise<void> {
    await this.browser.close();
    this.browser = null;
  }
}
