import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IContent } from '../module/interface';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Content')
    public readonly contentModel: Model<IContent>
  ) { }

  public async ListContents(title: string): Promise<IContent[] | any> {
    const contents = await this.contentModel.find(
      { id_Data: title },
      { __v: 0 }
    ).exec();
    return (!contents || contents.length < 1) ?
      { error: 'NO_RESULT', detail: 'No records found.' }
      : contents;
  }

  public async SpecifyContent(): Promise<IContent | any> {
    const specify = await this.contentModel.findOne({}).exec();
    return !specify ?
      { error: 'NO_RESULT', detail: 'No records found.' }
      : specify;
  }
}