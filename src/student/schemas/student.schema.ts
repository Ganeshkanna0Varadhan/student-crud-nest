import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: [true, 'Name is required'] })
  name: string;

  @Prop({ required: [true, 'Age is required'] })
  age: number;

  @Prop({ required: [true, 'City is required'] })
  city: string;

  @Prop({ required: [true, 'Contact Number is required'] })
  contact: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
