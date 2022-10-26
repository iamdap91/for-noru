import { registerAs } from '@nestjs/config';
import { Product, ProductOption, Restaurant } from '@gong-gu/models';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from './snake-naming.strategy';

const { env } = process;

export default registerAs('postgres', (): PostgresConnectionOptions => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = env;

  return {
    type: 'postgres',
    host: DB_HOST || 'localhost',
    port: +DB_PORT || 5432,
    username: DB_USER || 'postgres',
    password: DB_PASSWORD || 'example',
    database: DB_NAME || 'for-noru',
    entities: [Product, ProductOption, Restaurant],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
  };
});
