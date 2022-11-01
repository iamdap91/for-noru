import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Indices } from '@for-noru/config';
import { SearchPlaceQuery } from './dto';

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
        size: 100,
        query: {
          bool: {
            must: { term: { petAllowed: true } },
            filter: {
              geo_distance: {
                distance: '1000km',
                'pin.location': { lat, lon },
              },
            },
          },
        },
      },
    });

    return { total, hits };
  }
}
