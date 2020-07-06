import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { FilesService } from './files.service';

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
    //console.log(result)
    return res.sendFile(result);
  }

  @Get('/:folder/:file')
  public async GetPrivateFiles() {

  }
}