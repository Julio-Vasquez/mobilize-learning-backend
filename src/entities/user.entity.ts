import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('User')
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column({ type: 'string' })
  username: string;

  @Column()
  password: string;
}
