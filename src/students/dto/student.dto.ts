import { Optional } from '@nestjs/common';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
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
}

export class createStudentDto {
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('EG')
  phone: string;

  @IsNotEmpty()
  @IsPositive()
  age: number;
}

export class queryParamsDto {
  @IsOptional()
  @IsNumberString()
  page: number;
  @IsOptional()
  @IsNumberString()
  limit: number;
}
