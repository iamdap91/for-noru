import { registerAs } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

export default registerAs('redis', () => {
  const config: RedisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  };

  return config;
});
