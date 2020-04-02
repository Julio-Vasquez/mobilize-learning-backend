import { Controller, Get, Param, Res } from '@nestjs/common';

import { UserService } from './user.service';
import { AccountDto } from './dto/account.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('profile/:username')
  public async MyProfile(@Param('username') account: AccountDto) {
    console.log(account.userName);
    const res = await this.service.MyProfile(account);
    console.log(res);
    return '';
  }

  @Get('account/:username')
  public async Account(@Param('username') account: AccountDto) {
    console.log(account.userName);
    const res = await this.service.Account(account);
    console.log(res);
    return '';
  }
}
