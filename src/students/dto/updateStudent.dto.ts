import { Optional } from '@nestjs/common';
import {
  IsAlpha,
  IsEmail,
  IsPhoneNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
export class updateStudentDto {
  @Optional()
  @IsAlpha()
  name?: string;

  @Optional()
  @IsEmail()
  email?: string;

  @Optional()
  @IsPositive()
  age?: number;

  @Optional()
  @IsPhoneNumber('EG')
  phone?: string;

  @Optional()
  @IsString()
  @MinLength(8)
  password: string;
}
