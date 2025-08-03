import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register-dto';
import { LocalGuard } from './guards/local.guard';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { LoginDto } from './dtos/login-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@CurrentUser() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  // @Post('logout')
  // @UseGuards(JwtGuard)
  // async logout(@CurrentUser() user: User) {
  //   return this.authService.logout(user.id);
  // }

  @Post('refresh-token')
  @UseGuards(JwtGuard)
  refreshToken(@CurrentUser() user: User) {
    return this.authService.refreshToken(user.id);
  }
}
