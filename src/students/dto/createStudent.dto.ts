import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
} from 'class-validator';
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
