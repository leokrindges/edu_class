import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentStatus } from '@prisma/client';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateStudentDto {
	@ApiProperty({
		description: 'Student name',
		example: 'John Doe',
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(150)
	name: string;

	@ApiPropertyOptional({
		description: 'Student email',
		example: 'john.doe@example.com',
	})
	@IsEmail()
	@IsOptional()
	@MaxLength(100)
	email?: string;

	@ApiPropertyOptional({
		description: 'Student phone',
		example: '+1234567890',
	})
	@IsString()
	@IsOptional()
	@MaxLength(15)
	phone?: string;

	@ApiPropertyOptional({
		description: 'Student notes',
		example: 'Some notes about the student',
	})
	@IsString()
	@IsOptional()
	@MaxLength(255)
	notes?: string;

	@ApiProperty({
		description: 'Student status',
		example: StudentStatus.ACTIVE,
	})
	@IsEnum(StudentStatus)
	@IsNotEmpty()
	status: StudentStatus;
}
