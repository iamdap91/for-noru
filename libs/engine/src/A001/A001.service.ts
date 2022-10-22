import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { NAVER_MAP_URL } from '../constants';
import { EngineParam } from '../interfaces/engine-param.interface';
import { EPS2097 } from '../../../common/src/geo-transcoder';

@Injectable()
export class A001Service {
  async restaurant({ name, address, coordinates }: EngineParam, page: Page) {
    console.log(name, address, coordinates);

    const url = this.figureUrl(name, coordinates);
    await page.goto(url);
    await page.waitForNavigation();

    console.log(1);
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
