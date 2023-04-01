import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

//configure our application is in this file as you see.
//enable cors impressed me here, I didn't know that Nest doesn't need new npm package for enable cors. I thought it is like express. I liked that.
//declare status folder to send ejs file as mail to user and use view engine to define ejs in our application.
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.enableCors();
  app.use(cookieParser());
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '..', 'templates'));
  app.setViewEngine(join(__dirname, '..', 'templates'));
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // add pipe validation to validate data first of all.

  await app.listen(2000);
}
bootstrap();
