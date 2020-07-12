import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { UserService } from './user.service';
import { AccountDto } from './dto/account.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post('profile')
  public async MyProfile(@Body() account: AccountDto) {
    const res = await this.service.MyProfile(account);
    return (res.error) ? { ...res, status: HttpStatus.NO_CONTENT } : { success: 'OK', payload: res };
  }

  @Post('account')
  public async Account(@Body() account: AccountDto) {
    const res: any = await this.service.Account(account);
    return res.error ? { ...res, status: HttpStatus.NO_CONTENT } : { success: 'OK', payload: res };
  }
}
