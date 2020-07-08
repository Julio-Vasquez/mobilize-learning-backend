import { diskStorage } from 'multer';
import { existsSync, mkdirsSync } from 'fs-extra';
import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class FileUploadService {
  public configMulter(): any {
    const config = new ConfigService();
    //limits en byts (1kb = 1000)
    return {
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|bmp|tif|svg|pdf|mp4|mkv|WebM)$/)) {
          cb(null, true);
        } else {
          cb(
            new HttpException(
              `Ese tipo de archivo no es soportado por ${config.get<string>('app.name')}`, 400,
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 100000000,
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!existsSync(`./uploads/courses/`)) {
            mkdirsSync(`./uploads/courses/`);
          }
          cb(null, `./uploads/courses/`);
        },
        filename: (req, file, cb) => {
          console.log(file.originalname.split('.')[0]);
          cb(
            null,
            `course-dt-${new Date()}-tm-h-mm-ss-a.${file.mimetype.split('/')[1]}`,
          );
        },
      }),
    };
  }
}