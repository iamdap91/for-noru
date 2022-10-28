const { env } = process;

export const environment = {
  production: true,
  REDIS_HOST: env.REDIS_HOST || 'redis',
  REDIS_PORT: +env.REDIS_PORT || 6379,
};
