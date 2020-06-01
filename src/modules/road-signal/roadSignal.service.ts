import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IRoadSignal } from './interface/roadSignal.interface';
import { TypeModule, State } from './../@common/enums';

@Injectable()
export class RoadsignalService {
  constructor(
    @InjectModel('Data')
    public readonly DataModel: Model<IRoadSignal>,
  ) {}
}
