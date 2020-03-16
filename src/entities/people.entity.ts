import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

import { Genders } from './enums/gender.enum';
import { State } from './enums/state.enum';
import { TypeDocs } from './enums/typedoc.enum';

@Entity('People')
export class People {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  identification: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  gender: Genders;

  @Column({ nullable: false })
  birthDate: string;

  @Column({ nullable: false })
  typeDoc: TypeDocs;

  @Column({ nullable: false })
  state: State;
}
