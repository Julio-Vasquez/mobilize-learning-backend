import { hash, compareSync } from 'bcryptjs';

import { People } from './people.entity';
import { State } from './enums/state.enum';

export class User {
  _id: string;

  username: string;

  password: string;

  email: string;

  state: State;

  public async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  public async comparePassword(attempt: string): Promise<boolean> {
    return await compareSync(attempt, this.password);
  }
}
