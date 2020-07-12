import { Document } from 'mongoose';

import { Tag } from './../../@common/enums';

export interface IScore extends Document {
  readonly _id: string;
  readonly key: string;
  readonly tag: Tag;
  readonly cal: number;
  readonly idPeople: string;
  readonly idTheme: string;
}