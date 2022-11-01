import { Browser, Page, ResourceType } from 'puppeteer';
import UserAgent from 'user-agents';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { BrowserOptionInterface } from '../interfaces';

const DEFAULT_BROWSER_OPTIONS = {
  args: [
    '--no-sandbox',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-default-apps',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-print-preview',
    '--disable-popup-blocking',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-zygote',
    '--password-store=basic',
    '--use-mock-keychain',
    '--lang=ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,da;q=0.5,zh-CN;q=0.4,zh;q=0.3',
  ],
};
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
    this.options = options || {};
  }

  async init(): Promise<BrowserFactory> {
    this.browser = await this.createBrowser(this.options);
    return this;
  }

  async createBrowser(options: BrowserOptionInterface): Promise<Browser> {
    const { fastMode, ...launchOptions } = options;

    const browser = await puppeteer.use(StealthPlugin()).launch({
      defaultViewport: { width: 1366, height: 768 },
      ...DEFAULT_BROWSER_OPTIONS,
      ...launchOptions,
    });

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
    await page.setDefaultTimeout(5 * 1000);

    return page;
  }

  async randomizeUserAgent() {
    const [page] = await this.browser.pages();
    await page.setUserAgent(
      new UserAgent({ deviceCategory: 'desktop' }).random().toString()
    );
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
