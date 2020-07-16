import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { CertificateSchema, UserSchema } from './../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Certificate', schema: CertificateSchema },
      { name: 'User', schema: UserSchema },
    ])
  ],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule { }
