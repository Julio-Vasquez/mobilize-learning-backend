import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { MongooseModule } from '@nestjs/mongoose';

import { DataSchema } from './../../schemas/data.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Data', schema: DataSchema }])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
