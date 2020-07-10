import {
  Controller,
  Post,
  HttpStatus,
  Body,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { diskStorage } from 'multer';

import { AuthService } from './auth.service';
import { LoginDto, UserDto, ResetPasswordDto, SignUpDto } from './dto';
import { fileFilter, editFileName } from './../@common/files/functions.multer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('login')
  public async Login(@Body() login: LoginDto) {
    console.log(login);
    const res = await this.service.Login(login);
    if (res.error) return { ...res, status: HttpStatus.UNAUTHORIZED };
    //delete spread  operator
    const { password, ...result } = res._doc;
    return { success: 'OK', token: this.jwtService.sign({ result }) };
  }

  @Post('signup')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], {
    storage: diskStorage({
      destination: './uploads/avatar',
      filename: editFileName,
    }),
    fileFilter: (req, file, cb) => fileFilter(file, cb, ['jpg', 'png'])
  }))
  public async SingUp(@Body() account: SignUpDto, @UploadedFiles() file) {
    console.log(account);
    const res: any = await this.service.SignUp(account);
    console.log(res);
    if (res.error) return { ...res, detail: 'INCORRECT_SIGNUP' };
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
