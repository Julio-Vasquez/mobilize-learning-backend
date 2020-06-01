import { Controller, Get, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

import { ModuleService } from './module.service';

import { GetModuleDto } from './dto/getModule.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly service: ModuleService) {}

  @Get('modules-:type/')
  public async GetModules(@Param('type') type: string) {
    const response = await this.service.GetModules(type);
    if (response.error) return { ...response, status: HttpStatus.NO_CONTENT };
    return { sucess: 'ok', payload: response };
  }

  @Post('current-content-road')
  public async CurrentContentRoadSignal(@Body() ccrs: GetModuleDto) {
    if (isValidObjectId(ccrs._id)) {
      const response = await this.service.CurrentContent(ccrs);
      if (response.error) return { ...response, status: HttpStatus.NO_CONTENT };
      return { sucess: 'ok', payload: response };
    } else
      return {
        error: 'INVALID_ObjectID',
        detail: 'ObjectId (_id) es Invalido',
      };
  }
}
