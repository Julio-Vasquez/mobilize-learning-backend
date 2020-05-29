import { Controller, Get, HttpStatus, Post, Body } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

import { RoadsignalService } from './roadSignal.service';

import { GetModuleDto } from './dto/getModule.dto';

@Controller('roadsignal')
export class RoadsignalController {
  constructor(private readonly service: RoadsignalService) {}

  @Get('roadsignal-modules/')
  public async GetModules() {
    const response = await this.service.GetModules();
    if (response.error) return { ...response, status: HttpStatus.NO_CONTENT };
    return { sucess: 'ok', payload: response };
  }

  @Post('current-content-road')
  public async CurrentContentRoadSignal(@Body() ccrs: GetModuleDto) {
    if (isValidObjectId(ccrs._id)) {
      const response = await this.service.CurrentContentRoadSignal(ccrs);
      if (response.error) return { ...response, status: HttpStatus.NO_CONTENT };
      return { sucess: 'ok', payload: response };
    } else
      return {
        error: 'INVALID_ObjectID',
        detail: 'ObjectId (_id) es Invalido',
      };
  }
}
