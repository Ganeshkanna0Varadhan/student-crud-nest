import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StudentService } from './student.service';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private ConfigService: ConfigService, private readonly studentService: StudentService) {}

  @Get() 
  getAllStudent(@Query('search') search: string): Promise<Student[]> {
    return this.studentService.getAllStudent(search);
  } 

  @Post()
  addStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Put(':id')
  updateStudent(@Param('id') id: string , @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
    if (!id) {
      throw new BadRequestException('Student id is required');
    }
    return this.studentService.updateStudent(id, updateStudentDto);
  } 

  @Get(':id')
  getStudent(@Param('id') id: string): Promise<Student> {
    if (!id) {
      throw new BadRequestException('Student id is required');
    }
    return this.studentService.getStudent(id);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: string): Promise<any> {
    if (!id) {
      throw new BadRequestException('Student id is required');
    }
    return this.studentService.deleteStudent(id);
  }
  
}
