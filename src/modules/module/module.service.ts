import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { IModule } from './interface/module.interface';
import { TypeModule, State } from './../@common/enums';
import { GetModuleDto } from './dto/getModule.dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel('Data')
    public readonly DataModel: Model<IModule>,
  ) {}

  public async GetModules(type: string): Promise<IModule[] | any> {
    let modules: IModule[], isType: string;

    if (TypeModule.RSD === type) {
      modules = await this.DataModel.find(
        { type: TypeModule.RSD, state: State.Active },
        { __v: 0 },
      ).exec();
      isType = TypeModule.RSD;
    } else if (TypeModule.BD === type) {
      modules = await this.DataModel.find(
        { type: TypeModule.BD, state: State.Active },
        { __v: 0 },
      ).exec();
      isType = TypeModule.BD;
    } else
      return {
        error: 'NONEXISTENT_MODULES',
        detail: 'No registramos ese tipo de modulo en la base de datos',
      };

    if (!modules || modules.length <= 0)
      return {
        error: `NONEXISTENT_MODULES_${isType}`.toLocaleUpperCase(),
        detail: `No existen ningun modulo de ${isType}`,
      };

    return modules;
  }

  public async CurrentContent(ccrs: GetModuleDto): Promise<IModule | any> {
    const content: IModule = await this.DataModel.findOne(
      { _id: ccrs._id, url: ccrs.url },
      { __v: 0 },
    ).exec();

    if (!content)
      return {
        error: `NONEXISTENT_CONTENT`,
        detail: `No existen ningun contenido con esas especificaciones`,
      };

    return content.state !== State.Active
      ? {
          error: 'CONTENT_INACTIVE',
          detail: 'El contenido que esta buscando se encuentra inactivo',
        }
      : content;
  }
}
