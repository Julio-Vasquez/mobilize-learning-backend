import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('People')
export class People {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;
}
