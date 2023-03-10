import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuardAdmin } from 'src/guard/auth.admin.guard';
import { AuthCustomerGuard } from 'src/guard/auth.customer.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() req) {
    console.log('REQ:', req);
    const user = await this.authService.login(req);
    console.log('user:', user);
    return user;
  }

  @UseGuards(AuthGuardAdmin)
  @Get('profile')
  getHello(@Request() req) {
    return req.user;
  }

  @Post('customer/login')
  async ctmLogin(@Body() req) {
    console.log('REQ:', req);
    const customer = await this.authService.login(req);
    console.log('customer:', customer);
    return customer;
  }

  @UseGuards(AuthCustomerGuard)
  @Get('customer/profile')
  getcustomer(@Request() req) {
    return req.user;
  }
}
