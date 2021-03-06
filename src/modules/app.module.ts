import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from './@common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseConfigService } from './@common/mongoose/mongoose.service';
import { CertificateModule } from './certificate/certificate.module';
import { EvaluativetestModule } from './evaluative-test/evaluativeTest.module';
import { ModuleModule } from './module/module.module';
import { FilesModule } from './files/files.module';
import { ScoreModule } from './score/score.module';
import { SubModule } from './sub-modules/submodule.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
    UserModule,
    ModuleModule,
    ContentModule,
    SubModule,
    FilesModule,
    ScoreModule,
    CertificateModule,
    EvaluativetestModule
  ]
})
export class AppModule { }
