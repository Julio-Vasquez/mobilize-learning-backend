import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  constructor() { }

  public async GetFile(folder: string, file: string) {
    const path: string = __dirname.replace('dist\\modules\\files', 'uploads');
    //const Path: string = path.replace('dist/modules/files', 'uploads');

    return existsSync(`${path}/${folder}/${file}`)
      ? `${path}/${folder}/${file}`
      : `${path}/f.jpg`;

  }
}
