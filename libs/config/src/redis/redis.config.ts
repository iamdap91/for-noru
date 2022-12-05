import { registerAs } from '@nestjs/config';
import {
  RedisClientOptions,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';

const { env } = process;

export default registerAs<RedisModuleOptions>('redis', () => {
  const config: RedisClientOptions = {
    host: env.REDIS_HOST || 'redis',
    port: Number(env.REDIS_PORT) || 6379,
  };

  return { config };
});
