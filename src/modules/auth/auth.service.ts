import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { HashPassword, ComparePassword } from './../common/bcrypt/bcrypt';
import { Mail } from './../common/mail';

import { UserService } from './../user/user.service';

import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { SignUpDto } from './dto/signup.dto';

import { IUser } from './interface/user.interface';
import { IPeople } from './interface/people.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<IUser>,
    @InjectModel('People')
    private readonly PeopleModel: Model<IPeople>,
    private readonly userService: UserService,
    private readonly mail: Mail,
    private readonly jwt: JwtService,
  ) {}

  public async Login(login: LoginDto): Promise<any> {
    const user: IUser = await this.UserModel.findOne(
      {
        userName: login.userName,
      },
      { _id: 0, email: 0, people: 0, __v: 0 },
    ).exec();

    return user && (await ComparePassword(login.password, user.password))
      ? {
          userName: user.userName,
          avatar: user.avatar,
          role: user.role,
          state: user.state,
        }
      : null;
  }

  public async SignUp(@Body() account: SignUpDto) {
    //register People
    const people = new this.PeopleModel(account);
    people.save();

    const user = new this.UserModel(account);
    user.save();
    return true;
  }

  //falta acomodar la url
  public async RestorePassword(user: UserDto) {
    const { _id, userName, password, email } = await this.UserModel.findOne({
      userName: user.userName,
    }).exec();

    const token = this.jwt.sign({
      ID: _id,
      OldPassword: password,
      User: userName,
    });

    return this.mail.SendSingleEMailHtml(
      email,
      'Reset Password',
      `url/${token}`,
    );
  }

  //falta testear
  public async ResetPassword(restore: ResetPasswordDto) {
    const token: any = this.jwt.decode(restore.token);
    if (token) {
      const result = await this.UserModel.updateOne(
        {
          _id: token.ID,
          password: token.OldPassword,
          userName: token.User,
        },
        {
          password: HashPassword(restore.newPassword),
        },
      ).exec();
      return result ? true : false;
    } else return false;
  }

  public async ValidUserToken(token: any): Promise<boolean> {
    if (!token) return false;
    return await this.userService.ValidUserToken(token);
  }

  public async ValidUser(userName: string, password: string) {
    return this.userService.ValidUser(userName, password);
  }
}
