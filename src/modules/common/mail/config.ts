import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

export class ConfigMail {
  constructor(private readonly config: ConfigService) {}

  public GetConfig() {
    const EMAIL = this.config.get<string>('app.email'),
      PASSWORD = this.config.get<string>('app.pwd');
    console.log(EMAIL);
    return createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
  }
}
