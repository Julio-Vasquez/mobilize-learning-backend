import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async Login() {
    return '';
  }

  public async SignUp() {
    return '';
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

  private async HashPassword(pwd: string) {
    return await hash(pwd, 10);
  }
}
