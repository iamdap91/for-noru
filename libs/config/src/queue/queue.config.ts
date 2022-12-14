import { registerAs } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

const { env } = process;

export default registerAs('queue', () => {
  const config: RedisOptions = {
    host: env.REDIS_HOST || 'redis',
    port: Number(env.REDIS_PORT) || 6379,
  };

  return config;
});
