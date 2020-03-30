import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../schemas/user.entity';
import { People } from '../../schemas/people.entity';
import { UserService } from './../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, People])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
