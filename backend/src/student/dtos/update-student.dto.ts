import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class UpdatedStudentDto extends PartialType(CreateStudentDto) {}
