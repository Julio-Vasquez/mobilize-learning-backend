import { Document } from 'mongoose';

import { Genders } from './../../common/enums/gender.enum';
import { TypeDocs } from './../../common/enums/typedoc.enum';
import { State } from './../../common/enums/state.enum';

export interface PeopleInterface extends Document {
  readonly _id: string;
  readonly identification: number;
  readonly name: string;
  readonly lastName: string;
  readonly gender: Genders;
  readonly birthDate: string;
  readonly typeDoc: TypeDocs;
  readonly state: State;
}
