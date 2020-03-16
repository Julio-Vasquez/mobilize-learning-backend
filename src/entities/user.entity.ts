import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

import { People } from './people.entity';
import { State } from './enums/state.enum';

@Entity('User')
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({
    nullable: false,
    type: 'string',
  })
  username: string;

  @Column({
    nullable: false,
    type: 'string',
  })
  password: string;

  @Column({
    nullable: false,
    type: 'string',
  })
  email: string;

  @Column({ nullable: false })
  state: State;

  @Column(type => People)
  people: People[];
}
