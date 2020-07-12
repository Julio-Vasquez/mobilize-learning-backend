import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { UserSchema } from '../../schemas';
import { PeopleSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'People', schema: PeopleSchema },
      { name: 'User', schema: UserSchema },
    ]),
    JwtModule.register({
      privateKey: process.env.JWT_KEY,
      signOptions: {
        expiresIn: 21600,
      },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService, UserService],
})
export class AuthModule { }
