import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareSync } from 'bcryptjs';

import { UserInterface } from './interface/user.interface';
import { PeopleInterface } from './interface/people.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<UserInterface>,
    @InjectModel('People')
    private readonly PeopleModel: Model<PeopleInterface>,
  ) {}

  public async MyProfile(userName: string): Promise<PeopleInterface> {
    return new this.PeopleModel();
  }

  public async Account(userName: string) {
    const res = false;
    return res ? res : undefined;
  }

  public async ValidUserToken(userName: string): Promise<boolean> {
    const result = await this.UserModel.findOne({ userName: userName }).exec();
    return result ? true : false;
  }

  public async ValidUser(userName: string, password: string) {
    const user = await this.UserModel.findOne({ userName: userName }).exec();
    console.log(`check => ${user}`);
    console.log(
      (await this.comparePassword(password, user.password)) ? true : false,
    );
    return user && (await this.comparePassword(password, user.password))
      ? true
      : false;
  }

  private async comparePassword(attempt: string, currentPassword: string) {
    return await compareSync(attempt, currentPassword);
  }
}
