import { Module } from '@nestjs/common';
import { EvaluativetestController } from './evaluativeTest.controller';
import { EvaluativetestService } from './evaluativeTest.service';

@Module({
  imports: [],
  controllers: [EvaluativetestController],
  providers: [EvaluativetestService],
})
export class EvaluativetestModule {}
