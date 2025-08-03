import { Transform, Type } from 'class-transformer';
import { IsDate, IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { IsCPF } from '../decorators/is-cpf.decorator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  confirmPassword: string;

  @IsCPF()
  document: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  birthDate: Date;

  @IsString()
  @Matches(/^\d{11}$/)
  phone: string;
}
