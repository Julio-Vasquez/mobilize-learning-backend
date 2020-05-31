import { Module } from '@nestjs/common';
import { MobilityBehaviorsController } from './mobilityBehaviors.controller';
import { MobilityBehaviorsService } from './mobilityBehaviors.service';
import { MongooseModule } from '@nestjs/mongoose';

import { DataSchema } from './../../schemas/data.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Data', schema: DataSchema }])],
  controllers: [MobilityBehaviorsController],
  providers: [MobilityBehaviorsService],
})
export class MobilitybehaviorsModule {}
