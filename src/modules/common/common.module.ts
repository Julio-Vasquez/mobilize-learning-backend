import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './mongoose/mongoose.service';

import { Response } from './response';

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
  providers: [MongooseConfigService, Response],
  exports: [MongooseConfigService, Response],
})
export class CommonModule {}
