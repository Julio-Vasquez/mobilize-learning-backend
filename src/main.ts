import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    console.log(`Server Running on Port : ${3000}`);
  });

  Logger.log(`🚀 Server running on Port : ${3000}`, 'Bootstrap');
}

bootstrap();
