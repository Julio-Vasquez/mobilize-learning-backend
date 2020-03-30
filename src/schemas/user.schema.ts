//import { hash, compareSync } from 'bcryptjs';
import { Schema, Types } from 'mongoose';

export const UserSchema = new Schema({
  id: Types.ObjectId,
  username: String,
  password: String,
  email: String,
  state: {
    required: true,
    type: String,
    enum: ['Activo', 'Inactivo'],
  },
  people: { type: Types.ObjectId, ref: 'People' },
});

/*
public async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  public async comparePassword(attempt: string): Promise<boolean> {
    return await compareSync(attempt, this.password);
  }
*/
