import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';

@Injectable()
export class A001Service {
  async restaurant(id: number, page: Page) {
    console.log('restaurant scrape');
  }
}
