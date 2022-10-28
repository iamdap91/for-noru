import { NestFactory } from '@nestjs/core';

import { ScrapePlaceModule } from './scrape-place.module';

async function bootstrap() {
  const app = await NestFactory.create(ScrapePlaceModule);
  const port = process.env.PORT || 3333;
  await app.listen(port);
}

bootstrap();
