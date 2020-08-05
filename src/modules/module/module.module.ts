import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { DataSchema, ContentSchema } from './../../schemas';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Data', schema: DataSchema },
    { name: 'Content', schema: ContentSchema }
  ])
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule { }
