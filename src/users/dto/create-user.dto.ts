import { Transform, Type } from 'class-transformer';
import { IsDate, IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { IsCPF } from 'src/auth/decorators/is-cpf.decorator';

export class CreateUserDto {
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

  @IsCPF()
  document: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  birthDate: Date;

  @IsString()
  @Matches(/^\d{11}$/)
  phone: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  updatedAt: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  deletedAt: Date | null;
}
