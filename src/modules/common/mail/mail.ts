import { ConfigMail } from './config';
import { ResetPasswordMail } from './resetpassword';

export class Mail {
  config: ConfigMail;
  email: string;
  company: string;

  constructor() {
    this.config = new ConfigMail();
    this.company = process.env.COMPANY;
    this.email = process.env.PASSWORD;
  }

  public async SendMultipleEMail(dest: string[], sub: string, txt: string) {
    const info = await this.config.GetConfig().sendMail({
      from: `"${this.company} 👻" <${this.email}>`,
      to: dest,
      subject: `${sub} ✔`,
      text: txt,
    });
    console.log(`Message sent: ${info.messageId}`);
    return info.messageId ? true : false;
  }

  public async SendMultipleEMailHtml(dest: string[], sub: string, url: string) {
    const info = await this.config.GetConfig().sendMail({
      from: `"${this.company} 👻" <${this.email}>`,
      to: dest,
      subject: `${sub} ✔`,
      html: ResetPasswordMail(url, this.company, this.email, '', '', ''),
    });
    console.log(`Message sent: ${info.messageId}`);
    return info.messageId ? true : false;
  }

  public async SendSingleEMail(dest: string, sub: string, txt: string) {
    const info = await this.config.GetConfig().sendMail({
      from: `"${this.company} 👻" <${this.email}>`,
      to: dest,
      subject: `${sub} ✔`,
      text: txt,
    });
    console.log(`Message sent: ${info.messageId}`);
    return info.messageId ? true : false;
  }

  public async SendSingleEMailHtml(dest: string, sub: string, url: string) {
    const info = await this.config.GetConfig().sendMail({
      from: `"${this.company} 👻" <${this.email}>`,
      to: dest,
      subject: `${sub} ✔`,
      html: ResetPasswordMail(url, this.company, this.email, '', '', ''),
    });
    console.log(`Message sent: ${info.messageId}`);
    return info.messageId ? true : false;
  }
}
//https://myaccount.google.com/lesssecureapps
