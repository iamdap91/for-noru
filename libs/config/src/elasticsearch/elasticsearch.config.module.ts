import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchConfigService } from './elasticsearch-config.service';
import elasticsearchConfig from './elasticsearch.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [elasticsearchConfig],
      isGlobal: true,
    }),
  ],
  exports: [ElasticsearchConfigService],
  providers: [ElasticsearchConfigService],
})
export class ElasticsearchConfigModule {}
