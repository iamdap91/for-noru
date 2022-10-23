import { registerAs } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

const { env } = process;

export default registerAs('redis', () => {
  const config: RedisOptions = {
    host: env.REDIS_HOST || 'localhost',
    port: Number(env.REDIS_PORT) || 6379,
  };

  return config;
});
