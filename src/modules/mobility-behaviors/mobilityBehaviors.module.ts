import { Module } from '@nestjs/common';
import { MobilityBehaviorsController } from './mobilityBehaviors.controller';
import { MobilityBehaviorsService } from './mobilityBehaviors.service';

@Module({
  imports: [],
  controllers: [MobilityBehaviorsController],
  providers: [MobilityBehaviorsService],
})
export class MobilitybehaviorsModule {}
