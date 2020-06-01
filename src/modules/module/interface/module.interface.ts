import { Document } from 'mongoose';

import { TypeModule, State } from './../../@common/enums';

export interface IModule extends Document {
  readonly _id: string;
  readonly alt: string;
  readonly urlImg: string;
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly type: TypeModule;
  readonly state: State;
}
