import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('profile')
  public async MyProfile() {
    return '';
  }

  @Get('account/:username')
  public async Account(@Param('username') username: string) {
    console.log(username);
    const res = await this.service.Account(username);
    console.log(res);
    return '';
  }

  @Get()
  public holaMundo() {
    return '<h1>Hola mundo desde el backend, dice User</h1>';
  }
}
