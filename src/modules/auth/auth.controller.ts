import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  public async Login() {
    return '';
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
