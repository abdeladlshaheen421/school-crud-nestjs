import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/models/Student';
import { Repository } from 'typeorm';
import {
  createStudentDto,
  queryParamsDto,
  updateStudentDto,
} from '../dto/student.dto';

@Injectable()
export class Students {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // C for add New Student to students Table
  async create(studentData: createStudentDto): Promise<Object> {
    try {
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
  async findById(id: number): Promise<Student> {
    try {
      return await this.studentRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }
  // R Find Students with Pagination
  async findAll(query: queryParamsDto): Promise<Object> {
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
  async update(id: number, newData: updateStudentDto) {
    try {
      await this.studentRepository.update(id, {
        ...newData,
      });
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }
  // D delete a student
  async remove(id: number): Promise<Object> {
    try {
      await this.studentRepository.delete(id);
      return { message: 'Student is Removed SuccessFully' };
    } catch (error) {
      throw error;
    }
  }
}
