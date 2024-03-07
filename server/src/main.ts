import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //middleware
  app.enableCors();
  app.use(cookieParser());

  //
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Tasks')
    .setDescription('The Tasks API description')
    .setVersion('1.0')
    .addTag('type-tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port_app = process.env.APP_PORT || 3001;

  await app.listen(port_app);
}
bootstrap();
