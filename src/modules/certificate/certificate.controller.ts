import { Controller, Get } from '@nestjs/common';

@Controller('certificate')
export class CertificateController {
  constructor() {}

  @Get('generate')
  public async generateCertificate() {}

  //ckeck the porcent of curse!
  public async checkProgress() {}
}
