import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  providers: [],
  exports: [],
})
export class CommonModule {}
