import { Document } from 'mongoose';

import { State } from './../../common/enums/state.enum';

export interface UserInterface extends Document {
  readonly id: string;
  readonly userName: string;
  readonly password: string;
  readonly avatar: string;
  readonly email: string;
  readonly state: State;
  readonly people: string;
}
