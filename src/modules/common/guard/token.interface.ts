import { Role } from './../enums/role.enum';
import { State } from './../enums/state.enum';

export interface TokenDecode {
  readonly name: string;
  readonly lastName: string;
  readonly username: string;
  readonly role: Role;
  readonly state: State;
  readonly iat: number;
  readonly exp: number;
}
