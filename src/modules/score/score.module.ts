import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ScoreSchema, UserSchema } from '../../schemas';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Score', schema: ScoreSchema },
    { name: 'User', schema: UserSchema }
  ])],
  controllers: [ScoreController],
  providers: [ScoreService]
})

export class ScoreModule { }
