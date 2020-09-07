import { Controller, Get, Param } from '@nestjs/common';
import { SubmoduleService } from './submodule.service';

@Controller('submodule')
export class SubmoduleController {
  constructor(
    private readonly submoduleService: SubmoduleService
  ) { }


  @Get(':title')
  public async CurrentSubmodule(@Param(':title') title: string) {

  }

  @Get('titles/:type')
  public async GetTitles(@Param(':type') type: string) {

  }
}