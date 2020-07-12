import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from '../../schemas';
import { PeopleSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'People', schema: PeopleSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
