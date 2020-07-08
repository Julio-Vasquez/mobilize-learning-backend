import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { HttpException } from '@nestjs/common';

export const fileFilter = (file, cb: Function, filter: string[]) => {
  const newFilter = filter.toString().replace(/\,/gi, '|');
  let regularExpression = new RegExp(`\/(${newFilter})$`);
  if (file.mimetype.match(regularExpression)) cb(null, true);
  else cb(new HttpException('no soportado', 400), false);
};

export const editFileName = (req, file, cb) => cb(null, `${randomStringGenerator()}.${file.mimetype.split('/')[1]}`);