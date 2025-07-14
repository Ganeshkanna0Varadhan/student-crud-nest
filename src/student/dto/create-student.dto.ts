import { IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'Name is must string' })
  name: string;

  @IsNumber({}, { message: 'age is must number' })
  age: number;

  @IsString({ message: 'city is must string' })
  city: string;

  @IsString({ message: 'contact is must string' })
  contact: string; 
}