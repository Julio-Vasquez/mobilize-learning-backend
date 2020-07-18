import { Controller, HttpStatus, Post, Body } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateDto } from './dto';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) { }

  @Post('generate')
  public async generateCertificate(@Body() account: CertificateDto) {
    const res = await this.certificateService.Generate(account);

    return (res.error) ? { ...res, status: HttpStatus.NO_CONTENT } : { success: 'ok', payload: res };
  }

  //ckeck the porcent of curse!
  public async checkProgress() { }
}
