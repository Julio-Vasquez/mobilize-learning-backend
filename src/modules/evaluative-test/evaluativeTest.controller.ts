import { Controller, HttpStatus, Get, Post, Body, Param } from '@nestjs/common';

import { EvaluativetestService } from './evaluativeTest.service';
import { TestDto } from './dto/test.dto';

@Controller('evaluativetest')
export class EvaluativetestController {
  constructor(
    private readonly evaluativeTestService: EvaluativetestService
  ) { }

  @Get(':module')
  public async GetTest(@Param('module') module: string) {
    if (module !== undefined || module !== '') {
      const res = await this.evaluativeTestService.GetTest(module);
      return (res.error) ? { ...res, status: HttpStatus.NO_CONTENT } : { payload: res, success: 'ok' };
    }
    return { error: 'PAYLOAD_UNDEFINED', detail: 'the "Module" parameter can not be empty or undefined.' }
  }

  @Post('evaluate')
  public async EvalTest(@Body() test: TestDto) {
    const res = await this.evaluativeTestService.EvalTest(test);
    if (res.error) return { ...res, status: HttpStatus.SERVICE_UNAVAILABLE }
    return res < 6 ? { ...res, pass: false, success: 'ok' } : { ...res, pass: true, success: 'ok' }
  }
}
