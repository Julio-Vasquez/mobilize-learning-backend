import { Controller, Body, HttpStatus, Post } from '@nestjs/common';

import { ScoreDto } from './dto'
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) { }

  @Post('getscore')
  public async GetScore(@Body() body: ScoreDto) {
    console.log(body);
    const res = await this.scoreService.GetScore(body);
    if (res.error === 'NO_EXISTS_USER') return { ...res, status: HttpStatus.NON_AUTHORITATIVE_INFORMATION }
    return res.error ? { ...res, status: HttpStatus.NO_CONTENT } : { success: 'OK', payload: res };
  }

  @Post('create')
  public async CreateScore() {
    return await this.scoreService.CreateScore();
  }

}
