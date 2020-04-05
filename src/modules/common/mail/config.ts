import { createTransport } from 'nodemailer';

export class ConfigMail {
  public GetConfig() {
    const MAIL = process.env.EMAIL,
      PWD = process.env.PASSWORD;
    console.log('el mail:' + PWD);
    return createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: MAIL,
        pass: PWD,
      },
    });
  }
}
