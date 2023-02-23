/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log('req:', request.headers['authorization']);
    // console.log(request.header('authorization'));
    const bearer = request.header('authorization');
    // console.log('Bearer:', Bearer);
    bearer.replace('Bearer ', '');

    const parts = bearer.split(' ');
    // console.log('  ', parts);
    if (parts.length === 2) {
      const token = parts[1];
      console.log(token);
      try {
        const ver = await this.jwtService.verifyAsync(token, {
          secret: 'SECRET',
        });
        if (ver.username) {
          console.log(ver.username);
          console.log('success');
          return true;
        }
      } catch {
        console.log('failed');
        console.log(Error);
        return false;
      }
    }
    return false;
    // return validateRequest(request);
  }
}
