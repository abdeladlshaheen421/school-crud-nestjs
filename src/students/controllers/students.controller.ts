import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from '../services/students.service';
import { Student } from '../interfaces/students.interface';
import { queryParamsDto } from '../dto/queryParam.dto';
import { createStudentDto } from '../dto/createStudent.dto';
import { updateStudentDto } from '../dto/updateStudent.dto';
@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentService) {}
  // create student endpoint
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() student: createStudentDto): Promise<Object> {
    return await this.studentService.create(student);
  }

  //fetch student information endpoint
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    return await this.studentService.findById(id);
  }

  // get all Student with Pagination endpoint
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: queryParamsDto): Promise<Object> {
    //page limit
    return await this.studentService.findAll(query);
  }

  //update student information endpoint
  @Put(':id')
  @UsePipes(
    new ValidationPipe({ transform: true, skipMissingProperties: true }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() studentInfo: updateStudentDto,
  ): Promise<Student> {
    return await this.studentService.update(id, studentInfo);
  }
  // delete a student endpoint
  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number): Promise<Object> {
    return await this.studentService.remove(id);
  }
}
