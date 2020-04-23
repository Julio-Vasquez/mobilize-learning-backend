import { Module } from '@nestjs/common';
import { RoadsignalController } from './roadSignal.controller';
import { RoadsignalService } from './roadSignal.service';

@Module({
  imports: [],
  controllers: [RoadsignalController],
  providers: [RoadsignalService],
})
export class RoadsignalModule {}
