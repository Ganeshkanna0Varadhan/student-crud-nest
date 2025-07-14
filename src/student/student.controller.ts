import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StudentService } from './student.service';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private ConfigService: ConfigService, private readonly studentService: StudentService) {}

  @Get() 
  getAllStudent(): Promise<Student[]> {
    return this.studentService.getAllStudent();
  } 

  @Post()
  addStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Patch(':id')
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
