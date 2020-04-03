import { ConfigService } from '@nestjs/config';
import { ConfigMail } from './config';
import { ResetPasswordMail } from './resetpassword';

export class Mail {
  constructor(
    private readonly configMail: ConfigMail,
    private readonly config: ConfigService,
  ) {}

  company: string = this.config.get<string>('app.company');
  email: string = this.config.get<string>('app.email');

  public async SendMultipleEMail(dest: string[], sub: string, txt: string) {
    const info = await this.configMail.GetConfig().sendMail({
      from: `"${this.company} 👻" <${this.email}>`,
      to: dest,
      subject: `${sub} ✔`,
      text: txt,
    });
    console.log(`Message sent: ${info.messageId}`);
    return info.messageId ? true : false;
  }

  public async SendMultipleEMailHtml(dest: string[], sub: string, url: string) {
    const info = await this.configMail.GetConfig().sendMail({
      from: `"${this.company} 👻" <${this.email}>`,
      to: dest,
      subject: `${sub} ✔`,
      html: ResetPasswordMail(url, this.company, this.email, '', '', ''),
    });
    console.log(`Message sent: ${info.messageId}`);
    return info.messageId ? true : false;
  }

  public async SendSingleEMail(dest: string, sub: string, txt: string) {
    const info = await this.configMail.GetConfig().sendMail({
      from: `"${this.company} 👻" <${this.email}>`,
      to: dest,
      subject: `${sub} ✔`,
      text: txt,
    });
    console.log(`Message sent: ${info.messageId}`);
    return info.messageId ? true : false;
  }

  public async SendSingleEMailHtml(dest: string, sub: string, url: string) {
    console.log(typeof this.config);
    const company = this.config.get<string>('app.company');
    const email = this.config.get<string>('app.email');

    const info = await this.configMail.GetConfig().sendMail({
      from: `"${company} 👻" <${email}>`,
      to: dest,
      subject: `${sub} ✔`,
      html: ResetPasswordMail(url, company, email, '', '', ''),
    });
    console.log(`Message sent: ${info.messageId}`);
    return info.messageId ? true : false;
  }
}
//https://myaccount.google.com/lesssecureapps
