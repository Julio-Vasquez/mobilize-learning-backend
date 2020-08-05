import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { TypeModule, State } from './../@common/enums';
import { GetModuleDto } from './dto/getModule.dto';
import { IContent, IModule } from './interface';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel('Data')
    public readonly DataModel: Model<IModule>,
    @InjectModel('Content')
    public readonly ContentModel: Model<IContent>
  ) { }

  public async GetModules(type: string): Promise<IModule[] | any> {
    let modules: IModule[], isType: string;

    if (TypeModule.RSD.toLowerCase() === type) {
      modules = await this.DataModel.find(
        { type: TypeModule.RSD, state: State.Active },
        { __v: 0 },
      ).exec();
      isType = TypeModule.RSD;
    } else if (TypeModule.BD.toLowerCase() === type) {
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

  public async ListContentModule(module): Promise<IContent | any> {
    const { _id }: IModule = await this.DataModel.findOne({ type: module }, { _id: 1 });
    if (!_id) return { error: 'NO_MODULE', detail: 'No existe ese modulo' };

    const content: IContent[] = await this.ContentModel.find({ id_Data: _id, state: State.Active });
    if (!content || content.length < 1)
      return { error: 'NO_CONTENT', detail: 'No existe contenido relacionado a ese modulo' };

    return content;
  }
}
