import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IMobilityBehaviors } from './interface/mobility-behaviors.interface';
import { TypeModule, State } from './../@common/enums';
import { GetModuleDto } from './dto/getModule.dto';

@Injectable()
export class MobilityBehaviorsService {
  constructor(
    @InjectModel('Data')
    public readonly DataModel: Model<IMobilityBehaviors>,
  ) {}

  public async GetModules(): Promise<IMobilityBehaviors[] | any> {
    const modules: IMobilityBehaviors[] = await this.DataModel.find(
      { type: TypeModule.BD, state: State.Active },
      { __v: 0 },
    ).exec();
    if (!modules || modules.length <= 0)
      return {
        error: `NONEXISTENT_MODULES_${TypeModule.BD}`.toLocaleUpperCase(),
        detail: `No existen ningun module de ${TypeModule.BD}`,
      };
    return modules;
  }

  public async CurrentContentMobilityBehaviors(
    ccmb: GetModuleDto,
  ): Promise<IMobilityBehaviors | any> {
    const content: IMobilityBehaviors = await this.DataModel.findOne(
      { _id: ccmb._id, url: ccmb.url },
      { __v: 0 },
    ).exec();

    if (!content)
      return {
        error: `NONEXISTENT_CONTENT_${TypeModule.BD}`.toLocaleUpperCase(),
        detail: `No existen ningun contenido con esas especificaciones de ${TypeModule.BD}`,
      };

    return content.state !== State.Active
      ? {
          error: 'CONTENT_INACTIVE',
          detail: 'El contenido que esta buscando se encuentra inactivo',
        }
      : content;
  }
}
