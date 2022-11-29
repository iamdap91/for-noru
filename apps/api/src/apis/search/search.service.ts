import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Indices } from '@for-noru/config';
import { SearchPlaceQuery } from './dto';
import { figureDistance } from '../../../../../libs/common/src/util/figure-distance';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async find({ lat, lon, category }: SearchPlaceQuery) {
    const {
      hits: { total, hits },
    } = await this.elasticsearchService.search({
      index: Indices.PLACES,
      body: {
        from: 0,
        size: 20,
        query: {
          bool: {
            filter: [
              { match: { categories: category } },
              {
                geo_distance: {
                  distance: '30km',
                  'pin.location': { lat, lon },
                },
              },
            ],
          },
        },
        sort: [
          {
            _geo_distance: {
              'pin.location': { lat, lon },
              order: 'asc',
              unit: 'km',
            },
          },
        ],
      },
    });

    return {
      total,
      hits: hits.map((hit) => {
        const { _id, _source } = hit;
        return {
          // todo 인터페이스 지정
          documentId: _id,
          // todo code, tags 모두 수집시에 처리.
          code: (_source as any).code.toString(),
          tags: (_source as any).tags || [],
          distance:
            figureDistance((_source as any).pin.location, { lat, lon }) + 'km',
          ...(_source as Record<string, string>),
        };
      }),
    };
  }
}
