import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { HttpException } from '@nestjs/common';
//import { format } from 'date-fns';

export class FileUploadService {
  public configMulter() {
    let folderName = '';
    return {
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(pdf)$/)) {
          folderName = 'PDF';
          cb(null, true);
        } else {
          cb(null, false);
          cb(
            new HttpException(
              `Ese tipo de archivo no es soportado por variableentorno`,
              400,
            ),
            false,
          );
        }
      },
      limit: {
        fileSize: 1000,
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!existsSync(`./uploads/${folderName}/`))
            mkdirSync(`./uploads/${folderName}/`);
          cb(null, `./uploads/${folderName}/`);
        },
        filename: (req, file, cb) => {},
      }),
    };
  }
}
