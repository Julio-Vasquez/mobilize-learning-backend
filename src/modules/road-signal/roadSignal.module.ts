import { Module } from '@nestjs/common';
import { RoadsignalController } from './roadSignal.controller';
import { RoadsignalService } from './roadSignal.service';
import { MongooseModule } from '@nestjs/mongoose';

import { DataSchema } from './../../schemas/data.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Data', schema: DataSchema }])],
  controllers: [RoadsignalController],
  providers: [RoadsignalService],
})
export class RoadsignalModule {}
