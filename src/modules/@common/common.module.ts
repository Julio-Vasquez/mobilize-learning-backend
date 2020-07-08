import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { MongooseConfigService } from './mongoose/mongoose.service';

import { Mail } from './mail';
import { Files } from './files/files';
import { FileUploadService } from './files/upload.service';
import app from './env/env.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app],
      envFilePath: process.cwd() + '/.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: 21600,
      },
    }),
  ],
  providers: [JwtModule, MongooseConfigService, Mail, Files, FileUploadService],
  exports: [JwtModule, MongooseConfigService, Mail, Files, FileUploadService],
})
export class CommonModule { }
