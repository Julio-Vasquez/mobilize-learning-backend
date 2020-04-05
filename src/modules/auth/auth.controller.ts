import { Controller, Get, Post, HttpStatus, Body, Put } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { Response } from './../common/response';

import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';

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

  //genera el token y envia el email
  @Post('restorepassword')
  public async RestorePassword(@Body() user: UserDto) {
    const res = await this.service.RestorePassword(user);
    if (!res) {
      return this.Response.status({
        StatusCode: HttpStatus.NO_CONTENT,
        Status: 'NO_CONTENT',
      }).payload();
    } else {
      return this.Response.status({ StatusCode: HttpStatus.OK })
        .message('MAIL_SEND')
        .payload();
    }
  }

  //chekear el token y asignara la nueva password
  @Put('resetpassword')
  public async ResetPassword(@Body() restore: ResetPasswordDto) {
    const res = await this.service.ResetPassword(restore);
    if (!res) {
      return this.Response.status({
        StatusCode: HttpStatus.NO_CONTENT,
        Status: 'NO_CONTENT',
      }).payload();
    } else {
      return this.Response.status({ StatusCode: HttpStatus.OK })
        .message('PASSWORD_UPDATE')
        .payload();
    }
  }

  @Get()
  public holaMundo() {
    return '<h1>Hola mundo desde el backend, dice Auth</h1>';
  }
}
