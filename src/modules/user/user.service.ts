import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserInterface } from './interface/user.interface';
import { PeopleInterface } from './interface/people.interface';

import { AccountDto } from './dto/account.dto';

import { ComparePassword } from './../common/bcrypt/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<UserInterface>,
    @InjectModel('People')
    private readonly PeopleModel: Model<PeopleInterface>,
  ) {}

  public async MyProfile(account: AccountDto): Promise<PeopleInterface> {
    const _idPeople: UserInterface = await this.UserModel.findOne(
      { userName: account.userName },
      { people: 1, _id: 0, __v: 0 },
    ).exec();
    const result: PeopleInterface = await this.PeopleModel.findOne(
      { id: _idPeople.people },
      { __v: 0 },
    ).exec();
    return result ? result : undefined;
  }

  public async Account(account: AccountDto): Promise<UserInterface> {
    const res = await this.UserModel.findOne({
      userName: account.userName,
    }).exec();
    return res ? res : undefined;
  }

  public async ValidUserToken(userName: string): Promise<boolean> {
    const result = await this.UserModel.findOne({ userName: userName }).exec();
    return result ? true : false;
  }

  public async ValidUser(userName: string, password: string) {
    const user = await this.UserModel.findOne({ userName: userName }).exec();
    return user && (await ComparePassword(password, user.password))
      ? true
      : false;
  }
}
