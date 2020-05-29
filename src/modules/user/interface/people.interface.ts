import { Document } from 'mongoose';

import { Genders, TypeDocs, State } from '../../@common/enums';

export interface IPeople extends Document {
  readonly _id: string;
  readonly identification: number;
  readonly name: string;
  readonly lastName: string;
  readonly gender: Genders;
  readonly birthDate: string;
  readonly typeDoc: TypeDocs;
  readonly state: State;
}
