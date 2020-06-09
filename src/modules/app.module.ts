import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from './@common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseConfigService } from './@common/mongoose/mongoose.service';
import { CertificateModule } from './certificate/certificate.module';
import { EvaluativetestModule } from './evaluative-test/evaluativeTest.module';
import { ModuleModule } from './module/module.module';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
    UserModule,
    ModuleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
