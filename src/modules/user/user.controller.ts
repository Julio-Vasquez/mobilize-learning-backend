import { Controller, Get, Param, Res } from '@nestjs/common';
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
  public async holaMundo(@Res() res) {
    res.send(await this.service.MyProfile('DarKPhuRioN'));
    // await this.service.MyProfile('DarKPhuRioN');
  }
}
