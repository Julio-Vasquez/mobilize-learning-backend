import { Module } from '@nestjs/common';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';

@Module({
  imports: [],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}
