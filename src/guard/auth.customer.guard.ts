import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class AuthCustomerGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private customerService: CustomersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const bearer = request.headers['authorization']);
    // console.log(request.header('authorization'));
    const bearer = request.header('authorization');
    console.log('Bearer:', bearer);
    bearer.replace('Bearer ', '');

    const parts = bearer.split(' ');
    console.log('parts:  ', parts);
    if (parts.length === 2) {
      const token = parts[1];
      console.log(token);
      try {
        const ver = await this.jwtService.verifyAsync(token, {
          secret: 'SECRET',
        });
        const customer = this.customerService.findOne(ver.username);
        if (customer) {
          console.log('Successful authentication:', (await customer).name);
          return true;
        }
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'UnAuthorized',
          },
          HttpStatus.FORBIDDEN,
          {
            cause: error,
          },
        );
      }
    }
    return false;
  }
}
