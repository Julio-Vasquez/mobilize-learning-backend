import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IMobilityBehaviors } from './interface/mobility-behaviors.interface';
import { TypeModule, State } from './../@common/enums';

@Injectable()
export class MobilityBehaviorsService {
  constructor(
    @InjectModel('Data')
    public readonly DataModel: Model<IMobilityBehaviors>,
  ) {}
}
