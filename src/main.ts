import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import * as fs from 'fs';
async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./secret/create-cert+2-key.pem'),
  //   cert: fs.readFileSync('./secret/create-cert+2.pem'),
  // };
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Kiberone')
    .setDescription('The Kiberone API description')
    .setVersion('0.2')
    // .addServer('api')
    .addBearerAuth({
      description: 'Enter your JWT token',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.use(cookieParser());

  await app.listen(3333);
}
bootstrap();
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTcxNjM3MDg0NywiZXhwIjoxNzE4OTYyODQ3fQ.P9pY301MTP0YJYY06bfjbJIVRr-4_SeunXc_GcBcr-M
