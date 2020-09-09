import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContentController } from './content.controller';
import { ContentService } from './content.service';

import { ContentSchema } from './../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema }])
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule { };