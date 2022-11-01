import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import {
  ElasticsearchConfigModule,
  ElasticsearchConfigService,
} from '@for-noru/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchConfigModule,
    ElasticsearchModule.registerAsync({
      useExisting: ElasticsearchConfigService,
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
