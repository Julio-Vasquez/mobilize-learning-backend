import { Document } from 'mongoose';
import { TypeContent, State } from './../../@common/enums';

export interface IContent extends Document {
  readonly _id: string;
  readonly type: TypeContent;
  readonly title: string;
  readonly description: string;
  readonly state: State;
  readonly id_Data: string;
}