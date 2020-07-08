import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { HttpException } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule { };
