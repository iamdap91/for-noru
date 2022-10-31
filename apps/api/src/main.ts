import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { CommonConfigService } from '@for-noru/config';

const globalPrefix = 'api';

const figureBoostrapMessage = (port: number, isProduction: boolean) => {
  return isProduction
    ? `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    : `🚀 Application is running on: http://localhost:${port}/${globalPrefix} 📜 swagger is running on: http://localhost:${port}/docs`;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const { port, isProduction } =
    app.get<CommonConfigService>(CommonConfigService);

  if (!isProduction) {
    const doc = new DocumentBuilder()
      .setTitle('for-noru')
      .setDescription('to-noru API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, doc);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(port);

  Logger.log(figureBoostrapMessage(port, isProduction));
}

bootstrap();
