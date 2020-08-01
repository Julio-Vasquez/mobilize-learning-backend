import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser, IPeople } from './interface';

import { AccountDto } from './dto/account.dto';

import { ComparePassword } from '../@common/bcrypt/bcrypt';

import { State } from './../@common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<IUser>,
    @InjectModel('People')
    private readonly PeopleModel: Model<IPeople>,
  ) { }

  public async MyProfile(account: AccountDto): Promise<IPeople | any> {
    const _idPeople: IUser = await this.UserModel.findOne(
      { userName: account.userName.toUpperCase() },
      { people: 1, role: 1, avatar: 1, userName: 1, _id: 0, state: 1 },
    ).exec();

    if (!_idPeople) return { error: 'NONEXISTENT_PEOPLE', detail: 'El usuario no existe' };

    const result: IPeople = await this.PeopleModel.findOne(
      { _id: _idPeople.people, state: State.Active },
      { __v: 0, _id: 0 }
    ).exec();

    if (!result) return { error: 'PEOPLE_INACTIVE', detail: 'La persona no esta activo' };
    else {
      const { people, ...resPeople } = _idPeople.toJSON();
      return { ...resPeople, ...result.toJSON() };
    }
  }

  public async Account(account: AccountDto) {
    const res = await this.UserModel.findOne(
      { userName: account.userName.toUpperCase() },
      { __v: 0, _id: 0 },
    ).exec();

    if (!res)
      return {
        error: 'NONEXISTENT_USER',
        detail: 'No se encontro ningun registro',
      };

    return res.state !== State.Active
      ? { error: 'USER_INACTIVE', detail: 'La persona no esta activo' }
      : res;
  }

  public async ValidUserToken(userName: string): Promise<boolean> {
    const result = await this.UserModel.findOne({ userName: userName }).exec();
    return result ? true : false;
  }

  public async ValidUser(userName: string, password: string): Promise<boolean> {
    const user = await this.UserModel.findOne({ userName: userName }).exec();
    return user && (await ComparePassword(password, user.password))
      ? true
      : false;
  }
}
