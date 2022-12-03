import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Indices } from '@for-noru/config';
import { figureDistance } from '@for-noru/common';
import { NAVER_MAP_URL, PlaceEsDoc } from '@for-noru/engine';
import { SearchPlaceQuery } from './dto';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async find({ lat, lon, category }: SearchPlaceQuery) {
    const {
      hits: { total, hits },
    } = await this.elasticsearchService.search<PlaceEsDoc>({
      index: Indices.PLACES,
      body: {
        from: 0,
        size: 50,
        query: {
          bool: {
            filter: [
              { match: { categories: category } },
              {
                geo_distance: {
                  distance: '100km',
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
          documentId: _id,
          mapUrl: `${NAVER_MAP_URL}/${_source.name}/place/${_source.code}`,
          tags: ['소형견', '중형견', '대형견', '칸 분리'],
          distance: figureDistance(_source.pin.location, { lat, lon }) + ' km',
          ..._source,
        };
      }),
    };
  }

  async findOne(id: string) {
    return this.elasticsearchService.get<PlaceEsDoc>({
      index: 'places',
      id: id,
    });
  }
}
