import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/models/Student';
import { Repository } from 'typeorm';
import { queryParamsDto } from '../dto/queryParam.dto';
import { createStudentDto } from '../dto/createStudent.dto';
import { updateStudentDto } from '../dto/updateStudent.dto';
import { successMessageType } from '../interfaces/successMessage.interface';
import { findAllStudentsType } from '../interfaces/findAllStudents.interface';
import bcrypt from 'bcrypt';
import { BCRYPT_PASSWORD, SALT_ROUNDS } from 'src/configration';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // C for add New Student to students Table
  async create(studentData: createStudentDto): Promise<successMessageType> {
    try {
      studentData.password = bcrypt.hashSync(
        studentData.password + BCRYPT_PASSWORD,
        SALT_ROUNDS,
      );
      const newStudent = this.studentRepository.create({
        ...studentData,
      });
      await this.studentRepository.save(newStudent);
      return { message: 'Student is Created SuccessFully' };
    } catch (error) {
      throw error;
    }
  }
  // R Find a specific student
  async findById(id: number): Promise<Student | null> {
    try {
      return await this.studentRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }
  // R Find Students with Pagination
  async findAll(query: queryParamsDto): Promise<findAllStudentsType> {
    try {
      let paginationObject = {};
      if (query?.page) paginationObject['skip'] = query.page * query.limit || 0;
      if (query?.limit) paginationObject['take'] = query.limit;
      const result = await this.studentRepository.findAndCount({
        ...paginationObject,
      });
      return { rows: result[0], count: result[1] };
    } catch (error) {
      throw error;
    }
  }

  // U update student data
  async update(id: number, newData: updateStudentDto): Promise<Student | null> {
    try {
      if (newData.password)
        newData.password = bcrypt.hashSync(
          newData.password + BCRYPT_PASSWORD,
          SALT_ROUNDS,
        );
      await this.studentRepository.update(id, {
        ...newData,
      });
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }
  // D delete a studenst
  async remove(id: number): Promise<successMessageType> {
    try {
      await this.studentRepository.delete(id);
      return { message: 'Student is Removed SuccessFully' };
    } catch (error) {
      throw error;
    }
  }
}
