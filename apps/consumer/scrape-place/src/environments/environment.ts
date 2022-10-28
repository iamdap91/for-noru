const { env } = process;

export const environment = {
  production: false,
  REDIS_HOST: env.REDIS_HOST || 'localhost',
  REDIS_PORT: +env.REDIS_PORT || 6379,
};
