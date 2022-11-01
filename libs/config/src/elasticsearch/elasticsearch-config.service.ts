import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  constructor(private configService: ConfigService) {}

  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return this.configService.get<ElasticsearchModuleOptions>('elasticsearch');
  }
}
