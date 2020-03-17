import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async MyProfile() {
    return '';
  }

  public async Account() {
    return '';
  }

  public async ValidUserToken(userName: string) {
    return '';
  }

  public async ValidUser(userName: string, password: string) {
    return '';
  }
}
