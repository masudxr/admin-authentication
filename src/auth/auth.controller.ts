import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
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

  @UseGuards(AuthGuard)
  @Get('profile')
  getHello(@Request() req) {
    return req.user;
  }
}
