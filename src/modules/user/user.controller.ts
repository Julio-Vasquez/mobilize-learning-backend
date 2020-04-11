import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { UserService } from './user.service';
import { AccountDto } from './dto/account.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('profile')
  public async MyProfile(@Body() account: AccountDto) {
    const response: any = await this.service.MyProfile(account);
    if (response.error) {
      return { ...response, status: HttpStatus.NO_CONTENT };
    }
    return { success: 'OK', payload: response };
  }

  @Post('account')
  public async Account(@Body() account: AccountDto) {
    const response: any = await this.service.Account(account);
    if (response.error) {
      return { ...response, status: HttpStatus.NO_CONTENT };
    }
    return { success: 'OK', payload: response };
  }
}
