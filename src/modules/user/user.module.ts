import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserSchema } from '../../schemas/user.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { PeopleSchema } from '../../schemas/people.schema';

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
export class UserModule {}
