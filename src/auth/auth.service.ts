import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/models/Student';
import bcrypt from 'bcrypt';
const { BCRYPT_PASSWORD } = process.env;
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  async validateUser(email: string, password: string): Promise<Student | null> {
    try {
      const user = <Student>await this.studentRepository.findOne({
        where: { email },
      });
      if (user && bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password))
        return user;
      return null;
    } catch (error) {
      throw error;
    }
  }
}
