import { Controller, Get, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

import { ModuleService } from './module.service';

import { GetModuleDto } from './dto/getModule.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly service: ModuleService) { }

  @Get(':type')
  public async GetModules(@Param('type') type: string) {
    console.log(type)
    const res = await this.service.GetModules(type);
    return (res.error) ? { ...res, status: HttpStatus.NO_CONTENT } : { success: 'ok', payload: res };
  }

  @Post('current-content')
  public async CurrentContentRoadSignal(@Body() ccrs: GetModuleDto) {
    if (isValidObjectId(ccrs._id)) {
      const res = await this.service.CurrentContent(ccrs);
      return (res.error) ? { ...res, status: HttpStatus.NO_CONTENT } : { sucess: 'ok', payload: res };
    } else
      return { error: 'INVALID_ObjectID', detail: 'ObjectId (_id) es Invalido' };
  }

  @Get('content/:module')
  public async GetListContentModule(@Param('module') module: string) {
    const res = await this.service.ListContentModule(module);
    return res.error ? { ...res, status: HttpStatus.NO_CONTENT } : { success: 'ok', payload: res };
  }
}
