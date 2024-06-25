import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Kiberone')
    .setDescription('The Kiberone API description')
    .setVersion('1.0')
    .addBearerAuth({
      description: 'Enter your JWT token',
      // 'Admin: Admin',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTcxNjM3MDg0NywiZXhwIjoxNzE4OTYyODQ3fQ.P9pY301MTP0YJYY06bfjbJIVRr-4_SeunXc_GcBcr-M
