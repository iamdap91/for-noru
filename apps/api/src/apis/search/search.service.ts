import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Indices } from '@for-noru/config';
import { SearchPlaceQuery } from './dto';
import { figureDistance } from '../../../../../libs/common/src/util/figure-distance';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async find({ lat, lon }: SearchPlaceQuery) {
    const {
      hits: { total, hits },
    } = await this.elasticsearchService.search({
      index: Indices.PLACES,
      body: {
        from: 0,
        size: 20,
        query: {
          bool: {
            filter: {
              geo_distance: {
                distance: '30km',
                'pin.location': { lat, lon },
              },
            },
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
          documentId: _id,
          ...(_source as Record<string, string>),
          code: (_source as any).code.toString(),
          tags: (_source as any).tags || [],
          distance:
            figureDistance((_source as any).pin.location, { lat, lon }) + 'km',
        };
      }),
    };
  }
}
