import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from '../../schemas/user.schema';
import { PeopleSchema } from '../../schemas/people.schema';
import { UserService } from './../user/user.service';
import { MulterModule } from '@nestjs/platform-express';

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
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/uploads/avatar',
        limits: { fileSize: 5000 }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService, UserService],
})
export class AuthModule { }
