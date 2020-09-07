import { Document } from 'mongoose';

import { State, TypeModule } from './../../@common/enums';

export interface ISubmodule extends Document {
  readonly _id: string;
  readonly title: string;
  readonly urlImg: string;
  readonly url: string;
  readonly description: string;
  readonly state: State;
  readonly typeModule: TypeModule;
  readonly module: string;
}
