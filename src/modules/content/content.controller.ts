import { Controller, Get, Post, Body, HttpStatus, Param } from '@nestjs/common';

import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService
  ) { }

  @Get(':titles')
  public async ListContent(@Param('titles') titles: string) {
    if (titles !== undefined || titles !== '') {
      const res = await this.contentService.ListContents(titles);
      return (res.error) ? { ...res, status: HttpStatus.NO_CONTENT } : { payload: res, success: 'ok' };
    }
    return { error: 'PAYLOAD_UNDEFINED', detail: 'the "Titles" parameter can not be empty or undefined.' }
  }

  @Get(':title')
  public async SpecifyContent(@Param('title') title: string) {
    if (title !== undefined || title !== '') {
      const res = await this.contentService.SpecifyContent();
      return (res.error) ? { ...res, status: HttpStatus.NO_CONTENT } : { payload: res, success: 'ok' };
    }
    return { error: 'PAYLOAD_UNDEFINED', detail: 'the "Title" parameter can not be empty or undefined.' }
  }
}