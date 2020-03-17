import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../../entities/user.entity';

import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly user: UserService,
  ) {}

  public async Login() {
    return '';
  }

  public async SignUp() {
    return '';
  }

  public async RestorePassword() {
    return '';
  }

  public async ValidUserToken(token) {
    return '';
  }

  public async ValidUser(userName: string, password: string) {
    return '';
  }
}
