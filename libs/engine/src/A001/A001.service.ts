import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { NAVER_MAP_URL } from '../constants';
import { EngineParam } from '../interfaces/engine-param.interface';
import { EPS2097 } from '../../../common/src/geo-transcoder';

@Injectable()
export class A001Service {
  async restaurant({ name, address, coordinates }: EngineParam, page: Page) {
    const url = this.figureUrl(name, coordinates);
    console.log(name, address, coordinates);
    console.log(url);

    const listInterceptor = this.interceptRequest(
      'https://map.naver.com/v5/api/search?caller=pcweb&query=',
      page
    );
    await page.goto(url);
    await page.waitForNavigation();
    const response: any = await listInterceptor;

    const restaurant = response.result.place.list.find(
      (item) => item.name === name
    );

    if (!restaurant) {
      return;
    }

    const detailInterceptor = this.interceptRequest(
      `https://map.naver.com/v5/api/sites/summary/${restaurant.id}`,
      page
    );
    await page.goto(`${NAVER_MAP_URL}/${name}/place/${restaurant.id}`);
    const detail = await detailInterceptor;

    return detail;
  }

  async interceptRequest(url: string, page: Page) {
    return new Promise(async (resolve) => {
      await page.on('response', async (response) => {
        const request = response.request();
        if (request.url().includes(url)) {
          const json = await response.json();
          resolve(json);
        }
      });
    });
  }

  figureUrl(name: string, coordinates: [number, number]) {
    let url = `${NAVER_MAP_URL}/${name}`;

    const [origX, origY] = coordinates;
    if (Boolean(origX && origY)) {
      const [x, y] = EPS2097.toEPSG3857(coordinates);
      url += `?c=${x},${y},0,0,0,0,dh`;
    }

    return url;
  }
}
