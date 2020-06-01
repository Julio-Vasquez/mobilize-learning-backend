import { Controller, HttpStatus, Body, Get, Post } from '@nestjs/common';

import { isValidObjectId } from 'mongoose';

import { MobilityBehaviorsService } from './mobilityBehaviors.service';

@Controller('mobility-behaviors')
export class MobilityBehaviorsController {
  constructor(private readonly service: MobilityBehaviorsService) {}
}
