import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login-dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CurrentUser } from './types/current-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findUserByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(jwtPayload);

    return { accessToken };
  }

  async validateUser(dto: LoginDto): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      return user;
    }

    return null;
  }

  async validateJwtUser(userId: string): Promise<CurrentUser> {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const currentUser: CurrentUser = {
      id: user.id,
      role: user.role,
    };

    return currentUser;
  }

  async register(dto: RegisterDto): Promise<User> {
    const createUserDto: CreateUserDto = {
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    return this.usersService.create(createUserDto);
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const jwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(jwtPayload);

    return { accessToken };
  }
}
