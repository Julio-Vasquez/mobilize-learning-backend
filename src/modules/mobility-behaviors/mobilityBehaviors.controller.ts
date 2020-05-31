import { Controller, HttpStatus, Body, Get, Post } from '@nestjs/common';

import { isValidObjectId } from 'mongoose';

import { MobilityBehaviorsService } from './mobilityBehaviors.service';

import { GetModuleDto } from './dto/getModule.dto';
@Controller('mobility-behaviors')
export class MobilityBehaviorsController {
  constructor(private readonly service: MobilityBehaviorsService) {}

  @Get('roadsignal-modules/')
  public async GetModules() {
    const response = await this.service.GetModules();
    if (response.error) return { ...response, status: HttpStatus.NO_CONTENT };
    return { sucess: 'ok', payload: response };
  }

  @Post('current-content-behaviors')
  public async CurrentContentMobilityBehaviors(@Body() ccmb: GetModuleDto) {
    if (isValidObjectId(ccmb._id)) {
      const response = await this.service.CurrentContentMobilityBehaviors(ccmb);
      if (response.error) return { ...response, status: HttpStatus.NO_CONTENT };
      return { sucess: 'ok', payload: response };
    } else
      return {
        error: 'INVALID_ObjectID',
        detail: 'ObjectId (_id) es Invalido',
      };
  }
}
