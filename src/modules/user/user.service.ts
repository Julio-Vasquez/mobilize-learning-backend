import { Injectable } from '@nestjs/common';

import { UserSchema } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor() {}

  public async MyProfile() {
    return '';
  }

  public async Account(userName: string) {
    const res = false; //await this.repository.findOneOrFail({ username: userName });
    console.log(res);
    return res ? res : undefined;
  }

  public async ValidUserToken(userName: string): Promise<boolean> {
    const res = false; /* await this.repository.findOne({
      where: { username: userName },
    });*/
    return res ? true : false;
  }

  public async ValidUser(userName: string, password: string) {
    /*const user = await this.repository.findOne({
      where: { username: userName },
    });
    console.log(`check => ${user}`);
    console.log(user && (await user.comparePassword(password)) ? true : false);
    return user && (await user.comparePassword(password)) ? true : false;*/
    return true;
  }
}
