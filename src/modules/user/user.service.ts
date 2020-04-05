import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from './interface/user.interface';
import { IPeople } from './interface/people.interface';

import { AccountDto } from './dto/account.dto';

import { ComparePassword } from './../common/bcrypt/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<IUser>,
    @InjectModel('People')
    private readonly PeopleModel: Model<IPeople>,
  ) {}

  public async MyProfile(account: AccountDto): Promise<IPeople> {
    const _idPeople: IUser = await this.UserModel.findOne(
      { userName: account.userName },
      { people: 1, _id: 0, __v: 0 },
    ).exec();
    const result: IPeople = await this.PeopleModel.findOne(
      { id: _idPeople.people },
      { __v: 0 },
    ).exec();
    return result ? result : undefined;
  }

  public async Account(account: AccountDto): Promise<IUser> {
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
