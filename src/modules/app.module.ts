import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { OrmConfigService } from './common/orm/orm.service';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: OrmConfigService,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
