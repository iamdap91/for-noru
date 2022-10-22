import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { NAVER_MAP_URL } from '../constants';

@Injectable()
export class A001Service {
  async restaurant(name: string, address: string, page: Page) {
    console.log(name, address);
    await page.goto(`${NAVER_MAP_URL}/${name}`);
    await page.waitForNavigation();

    console.log(1);
  }
}
