import {
  Controller,
  Post,
  HttpStatus,
  Body,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { LoginDto, UserDto, ResetPasswordDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('login')
  public async Login(@Body() login: LoginDto) {
    console.log(login)
    const res = await this.service.Login(login);
    if (res.error) return { ...res, status: HttpStatus.UNAUTHORIZED };
    return { sucess: 'OK', token: this.jwtService.sign({ ...res._doc }) };
  }

  @Post('signup')
  public async SingUp(@Body() account: SignUpDto) {
    const res: any = await this.service.SignUp(account);

    if (res.error) return { ...res, detail: 'INCORRECT_SIGNUP' };
    console.log(res);
    if (res.error) {
      return { ...res, detail: 'INCORRECT_SIGNUP' };
    }
    return { ...res, detail: 'SUCCESSFUL_SIGNUP' };
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
}
