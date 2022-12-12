import { IsNumberString, IsOptional } from 'class-validator';

export class queryParamsDto {
  @IsOptional()
  @IsNumberString()
  page: number;
  @IsOptional()
  @IsNumberString()
  limit: number;
}
