import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrmConfigService } from './orm/orm.service';

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
  providers: [OrmConfigService],
  exports: [OrmConfigService],
})
export class CommonModule {}
