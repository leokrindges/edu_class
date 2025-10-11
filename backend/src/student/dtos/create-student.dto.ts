import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentStatus } from '@prisma/client';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	Matches,
	IsDateString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PhoneUtils } from 'src/common/utils/phone.util';

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
		description: 'Student phone (Brazilian format)',
		example: '(51) 99999-9999',
	})
	@IsString()
	@IsOptional()
	@Transform(({ value }) => PhoneUtils.cleanPhone(value))
	@Matches(/^(\d{10}|\d{11})$/, {
		message: 'Phone must be a valid Brazilian phone number',
	})
	phone?: string;

	@ApiPropertyOptional({
		description: 'Student notes',
		example: 'Some notes about the student',
	})
	@IsString()
	@IsOptional()
	@MaxLength(255)
	notes?: string;

	@ApiPropertyOptional({
		description: 'Student birth date',
		example: '1995-06-23',
		type: 'string',
		format: 'date',
	})
	@IsOptional()
	@Transform(({ value }) => {
		if (!value) return undefined;
		const date = new Date(value);
		return isNaN(date.getTime()) ? undefined : date;
	})
	@Type(() => Date)
	birthDate?: Date;

	@ApiPropertyOptional({
		description: 'Student avatar',
		example: 'https://example.com/avatar.jpg',
	})
	@IsString()
	@IsOptional()
	@MaxLength(255)
	avatar?: string;

	@ApiProperty({
		description: 'Student status',
		example: StudentStatus.ACTIVE,
	})
	@IsEnum(StudentStatus)
	@IsNotEmpty()
	status: StudentStatus;
}
