import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('profile')
  public async MyProfile() {
    return '';
  }

  @Get('account')
  public async Account() {
    return '';
  }

  @Get()
  public holaMundo() {
    return '<h1>Hola mundo desde el backend, dice User</h1>';
  }
}
