import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './mongoose/mongoose.service';

import { Response } from './response';
import { Mail } from './mail';

import app from './env/env.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app],
      envFilePath: process.cwd() + '/.env',
      isGlobal: true,
    }),
  ],
  providers: [MongooseConfigService, Response, Mail],
  exports: [MongooseConfigService, Response, Mail],
})
export class CommonModule {}
