import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ISubmodule } from './interface/submodule.interface';

@Injectable()
export class SubmoduleService {
  constructor(
    @InjectModel('Subdata')
    public readonly subdataModel: Model<ISubmodule>
  ) { }

  public async GetTitles(type: string) {

  }

  public async CurrentSubmodule(title: string) {

  }
}