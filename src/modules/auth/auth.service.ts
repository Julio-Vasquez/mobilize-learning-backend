import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async Login() {
    return '';
  }

  public async SignUp() {
    /*await this.t.save({
      identification: 1117542316,
      name: 'Julio',
      lastName: 'Vásquez',
      gender: Genders.Man,
      birthDate: '22-02-1996',
      typeDoc: TypeDocs.CC,
      state: State.Active,
    });
    const _id = await this.t.findOne({ where: { name: 'Julio' } });
    await this.repository.save({
      username: 'DarKPhuRioN',
      password: 'phurion123',
      email: 'jualvali@live.com',
      state: State.Active,
      people: _id.id,
    });*/
  }

  public async RestorePassword() {
    return '';
  }

  public async ValidUserToken(token): Promise<boolean> {
    if (!token) return false;
    return await this.userService.ValidUserToken(token);
  }

  public async ValidUser(userName: string, password: string) {
    return this.userService.ValidUser(userName, password);
  }
}
