import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EvaluativetestController } from './evaluativeTest.controller';
import { EvaluativetestService } from './evaluativeTest.service';
import { QuestionSchema } from './../../schemas'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }])
  ],
  controllers: [EvaluativetestController],
  providers: [EvaluativetestService],
})
export class EvaluativetestModule { }
