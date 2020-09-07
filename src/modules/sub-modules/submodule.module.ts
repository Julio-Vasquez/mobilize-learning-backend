import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubmoduleController } from './submodule.contronller';
import { SubmoduleService } from './submodule.service';
import { SubdataSchema } from './../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subdata', schema: SubdataSchema }])
  ],
  controllers: [SubmoduleController],
  providers: [SubmoduleService],
})
export class SubModule { };