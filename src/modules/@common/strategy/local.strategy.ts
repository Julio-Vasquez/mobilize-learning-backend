import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './../../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
    });
  }

  private readonly logger = new Logger(AuthService.name);

  public async validate(username: string, password: string) {
    console.log(`Username ${username}`);
    const user = await this.authService.ValidUser(username, password);
    this.logger.log(user);
    if (!user) {
      console.log('que haces aqui inutil');
      throw new UnauthorizedException();
    }
    return user;
  }
}
