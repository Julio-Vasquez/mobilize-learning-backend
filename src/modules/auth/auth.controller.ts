import { Controller, Get, Post, HttpStatus, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { Response } from './../common/response';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly Response: Response,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  public async Login(@Body() login: LoginDto) {
    const res = await this.service.Login(login);
    if (!res) {
      return this.Response.status({
        StatusCode: HttpStatus.NO_CONTENT,
        Status: 'NO_CONTENT',
      }).payload();
    } else {
      return this.Response.status({ StatusCode: HttpStatus.OK })
        .message('OK')
        .payload(this.jwtService.sign(res));
    }
  }

  @Post('signup')
  public async SingUp() {
    return '';
  }

  @Get('restorepassword')
  public async RestorePassword() {
    return await this.service.RestorePassword();
  }

  @Get()
  public holaMundo() {
    return '<h1>Hola mundo desde el backend, dice Auth</h1>';
  }
}
