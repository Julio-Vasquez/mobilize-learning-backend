import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IRoadSignal } from './interface/roadSignal.interface';
import { TypeModule, State } from './../@common/enums';
import { GetModuleDto } from './dto/getModule.dto';

@Injectable()
export class RoadsignalService {
  constructor(
    @InjectModel('Data')
    public readonly DataModel: Model<IRoadSignal>,
  ) {}

  public async GetModules(): Promise<IRoadSignal[] | any> {
    const modules: IRoadSignal[] = await this.DataModel.find(
      { type: TypeModule.RSD, state: State.Active },
      { __v: 0 },
    ).exec();
    if (!modules || modules.length <= 0)
      return {
        error: `NONEXISTENT_MODULES_${TypeModule.RSD}`.toLocaleUpperCase(),
        detail: `No existen ningun module de ${TypeModule.RSD}`,
      };

    return modules;
  }

  public async CurrentContentRoadSignal(
    ccrs: GetModuleDto,
  ): Promise<IRoadSignal | any> {
    const content: IRoadSignal = await this.DataModel.findOne(
      { _id: ccrs._id, url: ccrs.url },
      { __v: 0 },
    ).exec();

    if (!content)
      return {
        error: `NONEXISTENT_CONTENT_${TypeModule.RSD}`.toLocaleUpperCase(),
        detail: `No existen ningun contenido con esas especificaciones de ${TypeModule.RSD}`,
      };

    return content.state !== State.Active
      ? {
          error: 'CONTENT_INACTIVE',
          detail: 'El contenido que esta buscando se encuentra inactivo',
        }
      : content;
  }
}
