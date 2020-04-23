import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './mongoose/mongoose.service';

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
  providers: [MongooseConfigService, Mail],
  exports: [MongooseConfigService, Mail],
})
export class CommonModule {}
