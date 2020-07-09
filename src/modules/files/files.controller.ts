import { Controller, Get, Param, Res, HttpStatus, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileFilter, editFileName } from './../@common/files/functions.multer';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(
    private readonly fs: FilesService
  ) { }


  @Get('/:folder/:file')
  public async GetFile(
    @Res() res,
    @Param('folder') folder: string,
    @Param('file') file: string) {
    const result: string = await this.fs.GetFile(folder, file);
    console.log(result + '.jpg')
    return res.sendFile(result);
  }

  @Get('/:folder/:file')
  public async GetPrivateFiles() {

  }

  @Post('/uploads')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], {
    storage: diskStorage({
      destination: './uploads/avatar',
      filename: editFileName
    }),
    fileFilter: (req, file, cb) => fileFilter(file, cb, ['PDF', 'png', 'jpg']),
    limits: { fileSize: 50000 }
  }))
  public async upload(@UploadedFiles() file) {
    console.log(file);
    console.log('=====')
  }
}