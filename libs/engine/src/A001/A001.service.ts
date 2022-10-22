import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';

@Injectable()
export class A001Service {
  async restaurant(name: string, address: string, page: Page) {
    console.log('restaurant scrape');
  }
}
