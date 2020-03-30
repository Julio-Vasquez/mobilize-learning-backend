import { Controller, Get, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from './../common/response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly Response: Response,
  ) {}

  @Post('login')
  public async Login() {
    /*const login = await this.service.ValidUser('', '');
     */
    const login = await this.service.Login();
    return this.Response.status({ state: HttpStatus.OK, detail: 'OK' })
      .message('OK')
      .payload(login);
  }

  @Post('signup')
  public async SingUp() {
    return '';
  }

  @Post('restorepassword')
  public async RestorePassword() {
    return '';
  }

  @Get()
  public holaMundo() {
    return '<h1>Hola mundo desde el backend, dice Auth</h1>';
  }
}
