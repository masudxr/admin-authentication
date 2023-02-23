import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class AuthenticateGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest<Request>();
    return req.isAuthenticated();
  }
}
