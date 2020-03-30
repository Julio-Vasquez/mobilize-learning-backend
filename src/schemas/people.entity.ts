import { Genders } from './enums/gender.enum';
import { State } from './enums/state.enum';
import { TypeDocs } from './enums/typedoc.enum';

export class People {
  id: string;

  identification: number;

  name: string;

  lastName: string;

  gender: Genders;

  birthDate: string;

  typeDoc: TypeDocs;

  state: State;
}
