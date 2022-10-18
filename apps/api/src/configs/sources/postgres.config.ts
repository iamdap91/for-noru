import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from '../strategies';
import { Product, ProductOption } from '../../models';

const { env } = process;

export default registerAs('postgres', (): PostgresConnectionOptions => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = env;

  return {
    type: 'postgres',
    host: DB_HOST || 'localhost',
    port: +DB_PORT || 5432,
    username: DB_USER || 'postgres',
    password: DB_PASSWORD || 'example',
    database: DB_NAME || 'gong-gu',
    entities: [Product, ProductOption],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
  };
});
