import { Controller, Get, Param, HttpStatus } from '@nestjs/common';

import { SubmoduleService } from './submodule.service';

@Controller('submodule')
export class SubmoduleController {
  constructor(
    private readonly submoduleService: SubmoduleService
  ) { }

  @Get(':title')
  public async CurrentSubmodule(@Param(':title') title: string) {
    if (title != undefined || title != '' || !title) {
      const res = await this.submoduleService.CurrentSubmodule(title);
      return (res.error) ? { ...res, status: HttpStatus.NO_CONTENT } : { success: 'ok', payload: res };
    }
    return { error: 'PAYLOAD_UNDEFINED', detail: 'the "Title" parameter can not be empty or undefined.' }
  }

  @Get('titles/:type')
  public async GetTitles(@Param(':type') type: string) {
    if (type != undefined || type != '' || !type) {
      const res = await this.submoduleService.GetTitles(type);
      return (res.error) ? { ...res, status: HttpStatus.NO_CONTENT } : { success: 'ok', payload: res };
    }
    return { error: 'PAYLOAD_UNDEFINED', detail: 'the "Type" parameter can not be empty or undefined.' }
  }
}