import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

import { People } from './people.entity';

@Entity('User')
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ type: 'string' })
  username: string;

  @Column()
  password: string;

  @Column(type => People)
  people: People[];
}
