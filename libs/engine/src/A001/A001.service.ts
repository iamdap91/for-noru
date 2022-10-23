import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { NAVER_MAP_URL } from '../constants';
import { EngineParam } from '../interfaces/engine-param.interface';
import { EPS2097 } from '../../../common/src/geo-transcoder';
import { PlaceDetail } from './interface';
import { FormattedPlace } from '@gong-gu/engine';
import { throwIfIsNil } from '@gong-gu/common';

@Injectable()
export class A001Service {
  async restaurant(
    { name, coordinates }: EngineParam,
    page: Page
  ): Promise<FormattedPlace> {
    const url = this.figureUrl(name, coordinates);
    console.log(name, coordinates);
    console.log(url);

    const listInterceptor = this.interceptRequest(
      'https://map.naver.com/v5/api/search?caller=pcweb&query=',
      page
    );
    await page.goto(url);
    await page.waitForNavigation();
    const response: any = await listInterceptor;

    // 해당하는 내역이 하나밖에 없을 경우 `네이버 플레이스`에서 자동으로 하나뿐인 장소로 리다이렉트 해주므로 에러차리 안함.
    const restaurant = response?.result?.place?.list?.find(
      (item) => item.name === name
    );

    const detailInterceptor = this.interceptRequest<PlaceDetail>(
      `https://map.naver.com/v5/api/sites/summary/`,
      page
    );
    await page.goto(`${NAVER_MAP_URL}/${name}/place/${restaurant?.id}`);
    const detail: PlaceDetail = await detailInterceptor.then(
      throwIfIsNil(new Error('장소 상세 정보를 가져오지 못했습니다.'))
    );

    return {
      images: [detail?.imageURL || detail?.images?.[0]?.url || ''],
      categories: detail.categories || [],
      petAllowed: !!detail?.options?.find((option) => option.id === 15),
    };
  }

  async interceptRequest<T>(url: string, page: Page): Promise<T> {
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
