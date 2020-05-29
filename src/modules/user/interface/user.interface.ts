import { Document } from 'mongoose';

import { State, Role } from '../../@common/enums';

export interface IUser extends Document {
  readonly _id: string;
  readonly userName: string;
  readonly password: string;
  readonly avatar: string;
  readonly email: string;
  readonly role: Role;
  readonly state: State;
  readonly people: string;
}
