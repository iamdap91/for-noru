import { registerAs } from '@nestjs/config';

const { env } = process;

enum NodeEnv {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}

interface CommonConfig {
  NODE_ENV: string;
  IS_PRODUCTION: boolean;
  PORT: number;
}

export default registerAs<CommonConfig>('COMMON', () => {
  const NODE_ENV = (env.NODE_ENV as NodeEnv) || NodeEnv.DEVELOPMENT;
  const IS_PRODUCTION = NODE_ENV === NodeEnv.PRODUCTION;
  const PORT = +env.PORT || 3333;

  return {
    NODE_ENV,
    IS_PRODUCTION,
    PORT,
  };
});
