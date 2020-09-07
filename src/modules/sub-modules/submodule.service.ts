import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ISubmodule } from './interface/submodule.interface';
import { TypeModule } from '../@common/enums';

@Injectable()
export class SubmoduleService {
  constructor(
    @InjectModel('Subdata')
    public readonly subdataModel: Model<ISubmodule>
  ) { }

  public async GetTitles(type: string): Promise<ISubmodule[] | any> {
    const isType = type === TypeModule.BD.toLowerCase() ? TypeModule.BD : TypeModule.RSD;

    const submodule = await this.subdataModel.find(
      { typeModule: isType },
      { title: 1, __v: 0 }
    ).exec();

    return (!submodule || submodule.length < 1)
      ?
      { error: 'NO_RESULT', detail: 'No records found.' }
      :
      submodule;
  }

  public async CurrentSubmodule(title: string): Promise<ISubmodule | any> {
    const submodule = await this.subdataModel.findOne(
      { title: title },
      { __v: 0 }
    ).exec();
    return (!submodule || submodule.title.length < 1)
      ?
      { error: 'NO_RESULT', detail: 'No records found.' }
      :
      submodule;
  }
}