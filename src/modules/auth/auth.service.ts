import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashPassword, ComparePassword } from './../common/bcrypt/bcrypt';

import { UserService } from './../user/user.service';

import { LoginDto } from './dto/login.dto';

import { UserInterface } from './interface/user.interface';
import { PeopleInterface } from './interface/people.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<UserInterface>,
    @InjectModel('People')
    private readonly PeopleModel: Model<PeopleInterface>,
    private readonly userService: UserService,
  ) {}

  public async Login(login: LoginDto): Promise<any> {
    const user: UserInterface = await this.UserModel.findOne(
      {
        userName: login.userName,
      },
      { _id: 0, email: 0, people: 0, __v: 0 },
    );
    return user && (await ComparePassword(login.password, user.password))
      ? {
          userName: user.userName,
          avatar: user.avatar,
          role: user.role,
          state: user.state,
        }
      : null;
  }

  public async SignUp() {
    return '';
  }

  public async RestorePassword() {
    return '';
  }

  public async ValidUserToken(token: any): Promise<boolean> {
    if (!token) return false;
    return await this.userService.ValidUserToken(token);
  }

  public async ValidUser(userName: string, password: string) {
    return this.userService.ValidUser(userName, password);
  }
}
