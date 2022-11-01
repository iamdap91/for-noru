import { registerAs } from '@nestjs/config';
import { ElasticsearchModuleOptions } from '@nestjs/elasticsearch';

const { env } = process;

export default registerAs('elasticsearch', (): ElasticsearchModuleOptions => {
  const { ES_HOST, ES_PORT } = env;

  return {
    nodes: [`http://${ES_HOST || 'localhost'}:${ES_PORT || 9200}`],
  };
});
