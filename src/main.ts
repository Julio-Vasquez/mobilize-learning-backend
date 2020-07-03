import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });

  const config = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config.get<string>('app.prefix'));

  await app.listen(config.get<number>('app.port'), () => {
    Logger.log(
      `🔥  App Name : ${config.get<string>('app.name')} 🔥`,
      'Logger-App-Name',
    );
    Logger.log(
      `🎓  Mode : ${config.get<string>('app.env')} 🎓`,
      'Logger-App-Mode',
    );
    Logger.log(
      `🚀  Server Running on ${config.get<string>('app.host')}:${config.get<
        number
      >('app.port')}/${config.get<string>('app.prefix')}/ 🚀 `,
      'Logger-Server-Running',
    );
  });
}

bootstrap();
