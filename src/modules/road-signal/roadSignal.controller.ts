import { Controller, Get, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

import { RoadsignalService } from './roadSignal.service';

@Controller('roadsignal')
export class RoadsignalController {
  constructor(private readonly service: RoadsignalService) {}
}
