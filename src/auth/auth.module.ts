import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Student } from 'src/models/Student';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [AuthService],
})
export class AuthModule {}
