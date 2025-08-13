import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Student, StudentDocument } from './schemas/student.schema';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private stdModel: Model<StudentDocument>) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const user = await this.stdModel.create(createStudentDto);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllStudent(search: string): Promise<Student[]> {
    try {
      if (search) {
        return await this.stdModel.find({ $text: { $search: search } });
      }
      return await this.stdModel.find({});
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getStudent(id: string): Promise<Student> {
    try {
      const student = (await this.stdModel.findById(id)) as Student;
      if (!student) {
        throw new NotFoundException({ message: 'No Data Found' });
      }
      return student;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    try {
      const student = ( await this.stdModel.findByIdAndUpdate(id, updateStudentDto, {
        new: true,
      })) as Student;

      if (!student) {
        throw new NotFoundException({ message: 'No Data Found' });
      }

      return student;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteStudent(id: string): Promise<any> {
    try {
      const result = await this.stdModel.findByIdAndDelete(id);
      if (!result) {
        throw new NotFoundException({ message: 'No Data Found' });
      }
      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
