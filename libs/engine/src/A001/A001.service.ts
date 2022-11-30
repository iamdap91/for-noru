import { Page } from 'puppeteer';
import { FormattedPlace, PlaceNotFoundError } from '@for-noru/engine';
import { Injectable } from '@nestjs/common';
import { sleep, throwIfIsNil } from '@for-noru/common';
import { EPS2097, nonBlank } from '@for-noru/common';
import { EngineParam } from '../interfaces/engine-param.interface';
import { NAVER_MAP_URL } from '../constants';
import { PlaceDetail } from './interface';

@Injectable()
export class A001Service {
  async place(
    { name, coordinates }: EngineParam,
    page: Page
  ): Promise<FormattedPlace> {
    const url = this.figureUrl(name, coordinates);

    const listInterceptor = this.interceptRequest(
      'https://map.naver.com/v5/api/search?caller=pcweb&query=',
      page
    );
    await page.goto(url);
    await page.waitForNavigation();
    const listResponse: any = await listInterceptor;
    // 해당하는 내역이 하나밖에 없을 경우 `네이버 플레이스`에서 자동으로 하나뿐인 장소로 리다이렉트 해주므로 에러차리 안함.
    const placeInfo = listResponse?.result?.place?.list?.find(
      (item: { name: string }) => nonBlank(name).includes(nonBlank(item.name))
    );
    if (!placeInfo) {
      throw new PlaceNotFoundError();
    }

    const detailInterceptor = this.interceptRequest<PlaceDetail>(
      `https://map.naver.com/v5/api/sites/summary/`,
      page
    );

    await page.goto(`${NAVER_MAP_URL}/${name}/place/${placeInfo?.id || ''}`);
    const detail: PlaceDetail = await detailInterceptor.then(
      throwIfIsNil(new PlaceNotFoundError())
    );
    await sleep(500);

    return {
      code: detail?.id,
      name: detail?.name || name,
      address: detail?.address || '',
      // images: [detail?.imageURL || detail?.images?.[0]?.url || ''],
      images: [
        ...new Set([
          detail?.imageURL,
          ...(detail?.images?.map((image) => image.url) || []),
        ]),
      ],
      categories: [...new Set(detail.categories.join('').split(','))],
      petAllowed: !!detail?.options?.find((option) => option.id === 15),
      description: detail?.description || '',
      lat: detail.y,
      lon: detail.x,
    };
  }

  async interceptRequest<T>(url: string, page: Page): Promise<T | null> {
    return new Promise(async (resolve) => {
      page.on('response', async (response) => {
        const request = response.request();
        if (request.url().includes(url) && request.method() === 'GET') {
          try {
            const json = await response.json();
            resolve(json);
          } catch (e) {
            resolve(null);
          }
        }
      });
      setTimeout(() => {
        resolve(null);
      }, 5 * 1000);
    });
  }

  figureUrl(name: string, coordinates: [string, string]) {
    let url = `${NAVER_MAP_URL}/${name}`;

    const [origX, origY] = coordinates || [];
    if (Boolean(origX && origY)) {
      const [x, y] = EPS2097.toEPSG3857([+origX, +origY]);
      url += `?c=${x},${y},0,0,0,0,dh`;
    }

    return url;
  }
}
