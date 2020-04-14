import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Body,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { Response } from '../@common/response';

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
    if (res.error) throw new UnauthorizedException(res);
    return { sucess: 'OK', payload: this.jwtService.sign({ ...res._doc }) };
  }

  @Post('signup')
  public async SingUp() {
    return '';
  }

  //genera el token y envia el email
  @Post('request-forgot-password')
  public async RestorePassword(@Body() user: UserDto) {
    const res = await this.service.RequestForgotPassword(user);
    if (res.error) return { ...res, status: HttpStatus.CONFLICT };
    return { ...res, detail: 'MAIL_SEND' };
  }

  //chekear el token y asignara la nueva password
  @Put('forgot-password')
  public async ResetPassword(@Body() restore: ResetPasswordDto) {
    const res = await this.service.ForgotPassword(restore);
    if (res.error) return { ...res, status: HttpStatus.CONFLICT };
    return { ...res, detail: 'Contraseña actualizada' };
  }

  @Get()
  public holaMundo() {
    return '<h1>Hola mundo desde el backend, dice Auth</h1>';
  }
}
