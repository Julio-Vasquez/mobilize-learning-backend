import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}
